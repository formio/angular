import {FormioForm, FormioService} from './index';
import { Injectable } from '@angular/core';

export class FormioPromiseService {
  private formioService: FormioService;

  constructor(public url: string, public options?: object) {
    this.formioService = new FormioService(url, options);
  }

  saveForm(form: FormioForm): Promise<any> {
    return this.formioService.saveForm(form).toPromise();
  }
  loadForm(options?: any): Promise<any> {
    return this.formioService.loadForm(options).toPromise();
  }
  loadSubmission(): Promise<any> {
    return this.formioService.loadSubmission().toPromise();
  }
  loadForms(query: any): Promise<any> {
    return this.formioService.loadForms(query).toPromise();
  }
  saveSubmission(submission: {}): Promise<any> {
    return this.formioService.saveSubmission(submission).toPromise();
  }
  loadSubmissions(): Promise<any> {
    return this.formioService.loadSubmissions().toPromise();
  }
}
