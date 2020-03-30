import {FormioForm, FormioService} from './index';

export class FormioPromiseService {
  private formioService: FormioService;

  constructor(public url: string, public options?: object) {
    this.formioService = new FormioService(url, options);
  }

  saveForm(form: FormioForm, options?: any): Promise<any> {
    return this.formioService.saveForm(form, options).toPromise();
  }
  loadForm(query?: any, options?: any): Promise<any> {
    return this.formioService.loadForm(query, options).toPromise();
  }
  loadSubmission(query?: any, options?: any): Promise<any> {
    return this.formioService.loadSubmission(query, options).toPromise();
  }
  userPermissions(user: any, form: any, submission: any): Promise<any> {
    return this.formioService.userPermissions(user, form, submission).toPromise();
  }
  deleteSubmission(data?: any, options?: any): Promise<any> {
    return this.formioService.deleteSubmission(data, options).toPromise();
  }
  loadForms(query: any, options?: any): Promise<any> {
    return this.formioService.loadForms(query, options).toPromise();
  }
  saveSubmission(submission: {}, options?: any): Promise<any> {
    return this.formioService.saveSubmission(submission, options).toPromise();
  }
  loadSubmissions(query?: any, options?: any): Promise<any> {
    return this.formioService.loadSubmissions(query, options).toPromise();
  }
}
