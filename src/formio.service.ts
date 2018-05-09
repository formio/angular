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
  loadSubmission(): Observable<{}> {
    return this.requestWrapper(() => this.formio.loadSubmission());
  }
  saveSubmission(submission: {}): Observable<{}> {
    return this.requestWrapper(() => this.formio.saveSubmission(submission));
  }
  loadSubmissions(): Observable<{}> {
    return this.requestWrapper(() => this.formio.loadSubmissions());
  }
}
