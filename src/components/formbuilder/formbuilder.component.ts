import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
  Optional,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  NgZone
} from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import {
  FormioForm,
  FormioOptions
} from '../../formio.common';
import { Formio, FormBuilder, Utils } from 'formiojs';
import { assign } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { CustomTagsService } from '../../custom-component/custom-tags.service';

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
  private refreshSubscription: Subscription;
  @Input() form?: FormioForm;
  @Input() options?: FormioOptions;
  @Input() formbuilder?: any;
  @Input() noeval ? = false;
  @Input() refresh?: Observable<void>;
  @Output() change?: EventEmitter<object>;
  @ViewChild('builder', { static: true }) builderElement?: ElementRef<any>;

  constructor(
    private ngZone: NgZone,
    @Optional() private config: FormioAppConfig,
    @Optional() private customTags?: CustomTagsService
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

    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          this.buildForm(this.form);
        });
      });
    }
  }

  setInstance(instance: any) {
    this.formio = instance;
    instance.off('addComponent');
    instance.off('saveComponent');
    instance.off('updateComponent');
    instance.off('removeComponent');
    instance.on('addComponent', (component, parent, path, index, isNew) => {
      this.ngZone.run(() => {
        if (isNew) {
          this.componentAdding = true;
        } else {
          this.change.emit({
            type: 'addComponent',
            builder: instance,
            form: instance.schema,
            component: component,
            parent: parent,
            path: path,
            index: index
          });
          this.componentAdding = false;
        }
      });
    });
    instance.on('saveComponent', (component, original, parent, path, index, isNew) => {
      this.ngZone.run(() => {
        this.change.emit({
          type: this.componentAdding ? 'addComponent' : 'saveComponent',
          builder: instance,
          form: instance.schema,
          component: component,
          originalComponent: original,
          parent: parent,
          path: path,
          index: index,
          isNew: isNew || false
        });
        this.componentAdding = false;
      });
    });
    instance.on('updateComponent', (component) => {
      this.ngZone.run(() => {
        this.change.emit({
          type: 'updateComponent',
          builder: instance,
          form: instance.schema,
          component: component
        });
      });
    });
    instance.on('removeComponent', (component, parent, path, index) => {
      this.ngZone.run(() => {
        this.change.emit({
          type: 'deleteComponent',
          builder: instance,
          form: instance.schema,
          component: component,
          parent: parent,
          path: path,
          index: index
        });
      });
    });
    this.ngZone.run(() => {
      this.readyResolve(instance);
    });
    return instance;
  }

  setDisplay(display: String) {
    return this.builder.setDisplay(display).then(instance => this.setInstance(instance));
  }

  buildForm(form: any) {
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
    const extraTags = this.customTags ? this.customTags.tags : [];
    this.builder = new Builder(
      this.builderElement.nativeElement,
      form,
      assign({
        icons: 'fontawesome',
        sanitizeConfig: {
          addTags: extraTags
        }
      }, this.options || {})
    );
    return this.builder.ready.then(instance => this.setInstance(instance));
  }

  ngOnChanges(changes: any) {
    Utils.Evaluator.noeval = this.noeval;

    if (changes.form && changes.form.currentValue) {
      this.ngZone.runOutsideAngular(() => {
        this.buildForm(changes.form.currentValue || {components: []});
      })
    }
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    if (this.formio) {
      this.formio.destroy();
    }
  }
}
