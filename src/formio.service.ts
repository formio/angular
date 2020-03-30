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
  saveForm(form: FormioForm): Observable<FormioForm> {
    return this.requestWrapper(() => this.formio.saveForm(form));
  }
  loadForm(options?: any): Observable<FormioForm> {
    return this.requestWrapper(() => this.formio.loadForm(options));
  }
  loadForms(query: any): Observable<FormioForm> {
    return this.requestWrapper(() => this.formio.loadForms(query));
  }
  loadSubmission(query?: any, opts?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.loadSubmission(query, opts));
  }
  userPermissions(user: any, form: any, submission: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.userPermissions(user, form, submission));
  }
  deleteSubmission(opts?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.deleteSubmission(opts));
  }
  saveSubmission(submission: {}): Observable<{}> {
    return this.requestWrapper(() => this.formio.saveSubmission(submission));
  }
  loadSubmissions(query?: any, opts?: any): Observable<{}> {
    return this.requestWrapper(() => this.formio.loadSubmissions(query, opts));
  }
}
