import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
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
import { Formio, FormBuilder, Utils } from 'formiojs';
import { assign } from 'lodash';

/* tslint:disable */
@Component({
  selector: 'form-builder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class FormBuilderComponent implements OnInit, OnChanges, OnDestroy {
  public ready: Promise<object>;
  public readyResolve: any;
  public formio: any;
  public builder: FormBuilder;
  public componentAdding = false;
  @Input() form?: FormioForm;
  @Input() options?: FormioOptions;
  @Input() formbuilder?: any;
  @Input() noeval ? = false;
  @Output() change?: EventEmitter<object>;
  @ViewChild('builder', { static: true }) builderElement?: ElementRef<any>;

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

  ngOnInit() {
    Utils.Evaluator.noeval = this.noeval;
  }

  setInstance(instance: any) {
    this.formio = instance;
    instance.off('addComponent');
    instance.off('saveComponent');
    instance.off('updateComponent');
    instance.off('deleteComponent');
    instance.on('addComponent', (event) => {
      if (event.isNew) {
        this.componentAdding = true;
      } else {
        this.change.emit({
          type: 'addComponent',
          builder: instance,
          form: instance.schema,
          component: event
        });
        this.componentAdding = false;
      }
    });
    instance.on('saveComponent', (event) => {
      this.change.emit({
        type: this.componentAdding ? 'addComponent' : 'saveComponent',
        builder: instance,
        form: instance.schema,
        component: event
      });
      this.componentAdding = false;
    });
    instance.on('updateComponent', (event) => this.change.emit({
      type: 'updateComponent',
      builder: instance,
      form: instance.schema,
      component: event
    }));
    instance.on('deleteComponent', (event) => this.change.emit({
      type: 'deleteComponent',
      builder: instance,
      form: instance.schema,
      component: event
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
      return this.setDisplay(form.display).then(() => {
        this.builder.form = form;
        this.builder.instance.form = form;
        return this.builder.instance;
      });
    }
    const Builder = this.formbuilder || FormBuilder;
    this.builder = new Builder(
      this.builderElement.nativeElement,
      form,
      assign({icons: 'fontawesome'}, this.options || {})
    );
    return this.builder.render().then(instance => this.setInstance(instance));
  }

  ngOnChanges(changes: any) {
    if (changes.form && changes.form.currentValue) {
      this.buildForm(changes.form.currentValue || {components: []});
    }
  }

  ngOnDestroy() {
    if (this.formio) {
      this.formio.destroy();
    }
  }
}
