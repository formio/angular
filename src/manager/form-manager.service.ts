import { Injectable, } from '@angular/core';
import { FormioAppConfig } from '../formio.config';
import { FormManagerConfig } from './form-manager.config';
import { Formio } from 'formiojs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class FormManagerService {
  public formio: Formio;

  constructor(
    public appConfig: FormioAppConfig,
    public config: FormManagerConfig
  ) {
    if (this.appConfig && this.appConfig.appUrl) {
      Formio.setBaseUrl(this.appConfig.apiUrl);
      Formio.setProjectUrl(this.appConfig.appUrl);
    } else {
      console.error('You must provide an AppConfig within your application!');
    }

    this.formio = new Formio(this.appConfig.appUrl);
  }

  setForm(route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.formio = new Formio(`${this.formio.formsUrl}/${params.id}`);
    });
  }

  loadForm() {
    return this.formio.loadForm();
  }

  setSubmission(route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.formio = new Formio(`${this.formio.submissionsUrl}/${params.id}`);
    });
  }

  loadForms() {
    return this.formio.loadForms({params: {
      tags: this.config.tag
    }});
  }

  createForm(form: any) {
    return this.formio.createform(form);
  }
}
