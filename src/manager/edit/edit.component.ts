import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManagerConfig } from '../form-manager.config';
import { FormioAlerts } from '../../components/alerts/formio.alerts';
import { FormBuilderComponent } from '../../components/formbuilder/formbuilder.component';
import _ from 'lodash';

@Component({
  templateUrl: './edit.component.html'
})
export class FormManagerEditComponent implements AfterViewInit {
  @ViewChild(FormBuilderComponent) builder: FormBuilderComponent;
  @ViewChild('title') formTitle: ElementRef;
  @ViewChild('type') formType: ElementRef;
  public builderReady: Promise<any>;
  public loading: Boolean;
  public editMode: Boolean;

  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute,
    public config: FormManagerConfig,
    public ref: ChangeDetectorRef,
    public alerts: FormioAlerts
  ) {
    this.loading = false;
    this.editMode = false;
  }

  checkBuilder(cb) {
    if (this.builder) {
      return cb(this.builder);
    }
    setTimeout(() => this.checkBuilder(cb), 100);
  }

  ngAfterViewInit() {
    this.loading = true;
    this.builderReady = new Promise((resolve) => this.checkBuilder(resolve));
    this.service.reset(this.route).then((form) => {
      if (this.service.formio.formId) {
        this.editMode = true;
        this.formTitle.nativeElement.value = form.title;
        this.formType.nativeElement.value = form.display || 'form';
        this.builderReady.then(() => {
          this.builder.buildForm(form);
          this.loading = false;
          this.ref.detectChanges();
        });
      }
    });

    this.formType.nativeElement.addEventListener('change', () => {
      this.builderReady.then(() => this.builder.setDisplay(this.formType.nativeElement.value));
    });
  }

  saveForm() {
    this.loading = true;
    return this.builderReady.then(() => {
      this.service.form.title = this.formTitle.nativeElement.value;
      this.service.form.display = this.formType.nativeElement.value;
      this.service.form.components = this.builder.formio.schema.components;
      if (this.config.tag) {
        this.service.form.tags = this.service.form.tags || [];
        this.service.form.tags.push(this.config.tag);
        this.service.form.tags = _.uniq(this.service.form.tags);
      }
      if (!this.service.form._id) {
        this.service.form.name = _.camelCase(this.service.form.title).toLowerCase();
        this.service.form.path = this.service.form.name;
      }
      return this.service.saveForm().then(form => {
        this.loading = false;
        return form;
      }).catch(err => {
        this.loading = false;
        // Catch if a form is returned as an error. This is a conflict.
        if (err._id && err.type) {
          throw err;
        }
        this.alerts.setAlert({type: 'danger', message: (err.message || err)});
      });
    });
  }

  onSave() {
    return this.saveForm().then((form) => {
      if (this.editMode) {
        this.router.navigate(['../', 'view'], {relativeTo: this.route});
      } else {
        this.router.navigate(['../', form._id, 'view'], {relativeTo: this.route});
      }
    });
  }
}
