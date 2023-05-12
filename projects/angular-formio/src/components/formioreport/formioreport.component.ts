import { Component, OnInit, ViewEncapsulation, Input, OnChanges, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Formio } from 'formiojs';
import { FormioComponent } from '../formio/formio.component';
import { FormioReport } from '../../formio.common';

/* tslint:disable */
@Component({
  selector: 'formio-report',
  templateUrl: './formioreport.component.html',
  styleUrls: ['../../../../../node_modules/formiojs/dist/formio.form.min.css'],
  encapsulation: ViewEncapsulation.None,
})
/* tslint:enable */
export class FormioReportComponent extends FormioComponent implements OnInit, OnChanges {
  @Input() report?: FormioReport;
  @Output() fetchDataError = new EventEmitter<any>();
  @ViewChild('report', { static: true }) formioElement?: ElementRef<any>;

  setFormFromSrc() {
    this.service.loadSubmission({ params: { live: 1 } }).subscribe(
      (report: FormioReport) => {
        this.report = report;
        if (report && report.data) {
          this.ngZone.runOutsideAngular(() => {
            this.setForm({ components: [], report });
          });
        }
      },
      err => this.onError(err)
    );
  }

  setFormUrl(url) {
    return;
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes)

    if (changes.report && changes.report.currentValue) {
      this.ngZone.runOutsideAngular(() => {
        this.setForm({ report: changes.report.currentValue, components: [] });
      });
    }
  }

  getRendererOptions() {
    const apiUrl = this.url || this.config?.apiUrl || this.service?.formio?.projectUrl;

    if (!apiUrl && !this.src) {
      console.warn('The url is required to render the Report using JSON schema.');
    }
    return {
      apiUrl,
      ...super.getRendererOptions(),
    }
  }
  createRenderer() {
    const Renderer = this.getRenderer();
    if (!Renderer) {
      return null;
    }

    const form = (new Renderer(
      this.formioElement ? this.formioElement.nativeElement : null,
      this.report,
      this.getRendererOptions()
    ));
    return form.instance;
  }
 
  attachFormEvents() {
    this.formio.on('fetchDataError', (error: any, component: any) =>  this.ngZone.run(() => {
      this.alerts.addAlert({
        type: 'danger',
        message:  error ? JSON.stringify(error) : error,
      });
      this.fetchDataError.emit({error, component});
    }));
  }

  getRenderer() {
    const reportRenderer = (Formio as any).Report;
    if (!reportRenderer) {
      console.error('Report is not found in Formio. Please make sure that you are using the Formio Reporting module and it is correctly included in your application.');
    }

    return reportRenderer;
  }
}
