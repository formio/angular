import {
  Component,
  Input,
  AfterViewInit,
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
import { Formio } from 'formiojs';

/* tslint:disable */
@Component({
  selector: 'form-builder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class FormBuilderComponent implements AfterViewInit {
  public ready: Promise<object>;
  public readyResolve: any;
  public formio: any;
  @Input() form?: FormioForm;
  @Input() options?: FormioOptions;
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

  ngAfterViewInit() {
    Formio.builder(this.builderElement.nativeElement, this.form, this.options).then((instance) => {
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
    });
  }
}
