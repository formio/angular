import {FormioForm, FormioService} from './index';

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
  loadSubmission(query?: any, opts?: any): Promise<any> {
    return this.formioService.loadSubmission(query, opts).toPromise();
  }
  userPermissions(user: any, form: any, submission: any): Promise<any> {
    return this.formioService.userPermissions(user, form, submission).toPromise();
  }
  deleteSubmission(opts?: any): Promise<any> {
    return this.formioService.deleteSubmission(opts).toPromise();
  }
  loadForms(query: any): Promise<any> {
    return this.formioService.loadForms(query).toPromise();
  }
  saveSubmission(submission: {}): Promise<any> {
    return this.formioService.saveSubmission(submission).toPromise();
  }
  loadSubmissions(query?: any, opts?: any): Promise<any> {
    return this.formioService.loadSubmissions(query, opts).toPromise();
  }
}
