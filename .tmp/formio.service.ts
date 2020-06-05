import { Observable, Observer } from 'rxjs';
import { FormioForm } from './formio.common';
import { Formio } from 'formiojs';

export class FormioService {
  public formio: any;
  constructor(public url: string, public options?: object) {
    this.formio = new Formio(this.url, this.options);
  }
  requestWrapper(fn: any) {
    let record: any;
    let called = false;
    return Observable.create((observer: Observer<any>) => {
      try {
        if (!called) {
          called = true;
          fn()
            .then((_record: any) => {
              record = _record;
              observer.next(record);
              observer.complete();
            })
            .catch((err: any) => observer.error(err));
        } else if (record) {
          observer.next(record);
          observer.complete();
        }
      } catch (err) {
        observer.error(err);
      }
    });
  }
  saveForm(form: FormioForm, options?: any): Observable<FormioForm> {
    return this.requestWrapper(() => this.formio.saveForm(form, options));
  }
  loadForm(query?: any, options?: any): Observable<FormioForm> {
    return this.requestWrapper(() => this.formio.loadForm(query, options));
  }
  loadForms(query: any, options?: any): Observable<FormioForm> {
    return this.requestWrapper(() => this.formio.loadForms(query, options));
  }
  loadSubmission(query?: any, options?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.loadSubmission(query, options));
  }
  userPermissions(user: any, form: any, submission: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.userPermissions(user, form, submission));
  }
  deleteSubmission(data?: any, options?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.deleteSubmission(data, options));
  }
  saveSubmission(submission: {}, options?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.saveSubmission(submission, options));
  }
  loadSubmissions(query?: any, options?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.loadSubmissions(query, options));
  }
}
