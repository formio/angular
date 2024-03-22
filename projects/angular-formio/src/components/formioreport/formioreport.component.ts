import { Component, OnInit, ViewEncapsulation, Input, OnChanges, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Formio } from '@formio/js';
import { FormioComponent } from '../formio/formio.component';
import { FormioReport } from '../../formio.common';

/* tslint:disable */
@Component({
  selector: 'formio-report',
  templateUrl: './formioreport.component.html',
  styleUrls: ['../../../../../node_modules/@formio/js/dist/formio.form.min.css'],
  encapsulation: ViewEncapsulation.None,
})
/* tslint:enable */
export class FormioReportComponent extends FormioComponent implements OnInit, OnChanges {
  @Input() report?: FormioReport;
  @Input() projectEndpoint?: string;
  @Output() fetchDataError = new EventEmitter<any>();
  @ViewChild('report', { static: true }) declare formioElement?: ElementRef<any>;

  public isReportLoading: boolean;

  setFormFromSrc() {
    this.service.loadSubmission({ params: { live: 1 } }).subscribe(
      (report: FormioReport) => {
        this.report = report;
        if (report && report.data) {
          this.ngZone.runOutsideAngular(() => {
            this.setForm({ components: [], report });
            this.isReportLoading = false;
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
        this.isReportLoading = false;
      });
    }
  }

  getRendererOptions() {
    const projectEndpoint = this.projectEndpoint || this.config?.appUrl || this.service?.formio?.projectUrl;

    if (!projectEndpoint && !this.src) {
      console.warn('The projectEndpoint url is required to render the Report using JSON schema.');
    }
    return {
      projectEndpoint,
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
