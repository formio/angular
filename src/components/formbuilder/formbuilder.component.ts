import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  ViewEncapsulation,
  Optional,
  ElementRef,
  ViewChild, EventEmitter, Output
} from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import {
  FormioForm,
  FormioOptions
} from '../../formio.common';
import { Formio, FormBuilder } from 'formiojs';
import { assign } from 'lodash';

/* tslint:disable */
@Component({
  selector: 'form-builder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class FormBuilderComponent implements AfterViewInit, OnChanges {
  public ready: Promise<object>;
  public readyResolve: any;
  public formio: any;
  public builder: FormBuilder;
  @Input() form?: FormioForm;
  @Input() options?: FormioOptions;
  @Input() formbuilder?: any;
  @Output() change?: EventEmitter<object>;
  @ViewChild('builder') builderElement?: ElementRef;

  constructor(
    @Optional() private config: FormioAppConfig
  ) {
    if (this.config) {
      Formio.setBaseUrl(this.config.apiUrl);
      Formio.setProjectUrl(this.config.appUrl);
    } else {
      console.warn('You must provide an AppConfig within your application!');
    }

    this.change = new EventEmitter();
    this.ready = new Promise((resolve: any) => {
      this.readyResolve = resolve;
    });
  }

  setInstance(instance: any) {
    this.formio = instance;
    instance.on('saveComponent', () => this.change.emit({
      type: 'saveComponent',
      form: instance.schema
    }));
    instance.on('updateComponent', () => this.change.emit({
      type: 'updateComponent',
      form: instance.schema
    }));
    instance.on('deleteComponent', () => this.change.emit({
      type: 'deleteComponent',
      form: instance.schema
    }));
    this.readyResolve(instance);
    return instance;
  }

  setDisplay(display: String) {
    return this.builder.setDisplay(display).then(instance => this.setInstance(instance));
  }

  buildForm(form) {
    if (!form || !this.builderElement || !this.builderElement.nativeElement) {
      return;
    }

    if (this.builder) {
      return this.builder.instance.form = form;
    }
    const Builder = this.formbuilder || FormBuilder;
    this.builder = new Builder(
      this.builderElement.nativeElement,
      form,
      assign({icons: 'fontawesome'}, this.options || {})
    );
    this.builder.render().then(instance => this.setInstance(instance));
  }

  ngOnChanges(changes: any) {
    if (changes.form && changes.form.currentValue) {
      this.buildForm(changes.form.currentValue || {components: []});
    }
  }

  ngAfterViewInit() {
    this.buildForm(this.form);
  }
}
