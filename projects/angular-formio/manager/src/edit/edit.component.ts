import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManagerConfig } from '../form-manager.config';
import { FormioAlerts } from '@formio/angular';
import { FormBuilderComponent } from '@formio/angular';
import _ from 'lodash';

@Component({
  templateUrl: './edit.component.html'
})
export class FormManagerEditComponent implements AfterViewInit {
  @ViewChild(FormBuilderComponent, {static: false}) builder: FormBuilderComponent;
  @ViewChild('title', {static: false}) formTitle: ElementRef;
  @ViewChild('type', {static: false}) formType: ElementRef;
  public form: any;
  public loading: Boolean;
  public formReady: Boolean;
  public editMode: Boolean;

  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute,
    public config: FormManagerConfig,
    public ref: ChangeDetectorRef,
    public alerts: FormioAlerts
  ) {
    this.form = {components: []};
    this.formReady = false;
    this.loading = false;
    this.editMode = false;
  }

  initBuilder(editing) {
    if (editing) {
      this.loading = true;
      this.editMode = true;
      return this.service.formReady.then(() => {
        this.form = this.service.form;
        this.formTitle.nativeElement.value = this.service.form.title;
        this.formType.nativeElement.value = this.service.form.display || 'form';
        this.formReady = true;
        this.loading = false;
        this.ref.detectChanges();
        return true;
      }).catch(err => {
        this.alerts.setAlert({type: 'danger', message: (err.message || err)});
        this.loading = false;
        this.ref.detectChanges();
        this.formReady = true;
      });
    } else {
      this.formReady = true;
      return Promise.resolve(true);
    }
  }

  ngAfterViewInit() {
    this.route.url.subscribe( url => {
      setTimeout(() => this.initBuilder((url[0].path === 'edit')), 0);
    });
  }

  onDisplaySelect(event) {
    this.builder.setDisplay(event.target.value);
  }

  saveForm() {
    this.loading = true;
    this.form = _.cloneDeep(this.builder.formio.schema);
    this.form.title = this.formTitle.nativeElement.value.trim();
    this.form.display = this.formType.nativeElement.value;

    if (this.config.tag) {
      this.form.tags = this.form.tags || [];
      this.form.tags.push(this.config.tag);
      this.form.tags = _.uniq(this.form.tags);
    }
    if (!this.form._id) {
      this.form.name = _.camelCase(this.form.title).toLowerCase();
      this.form.path = this.form.name;
    }
    return this.service.formio.saveForm(this.form).then(form => {
      this.form = this.service.setForm(form);
      this.loading = false;
      return this.form;
    }).catch(err => {
      this.loading = false;
      // Catch if a form is returned as an error. This is a conflict.
      if (err._id && err.type) {
        throw err;
      }
      this.alerts.setAlert({type: 'danger', message: (err.message || err)});
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
