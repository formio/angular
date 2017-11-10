import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormioForm } from './formio.common';
/* tslint:disable */
const Formio = require('formiojs');
/* tslint:enable */

export class FormioService {
  public formio: any;
  constructor(public url: string, public options?: object) {
    this.formio = new Formio(this.url, this.options);
  }
  saveForm(form: FormioForm): Observable<FormioForm> {
    return Observable.create((observer: Observer<FormioForm>) => {
      try {
        this.formio
          .saveForm(form)
          .then((updatedForm: FormioForm) => {
            observer.next(updatedForm);
            observer.complete();
          })
          .catch((err: any) => observer.error(err));
      } catch (err) {
        observer.error(err);
      }
    });
  }
  loadForm(): Observable<FormioForm> {
    return Observable.create((observer: Observer<FormioForm>) => {
      try {
        this.formio
          .loadForm()
          .then((form: FormioForm) => {
            observer.next(form);
            observer.complete();
          })
          .catch((err: any) => observer.error(err));
      } catch (err) {
        observer.error(err);
      }
    });
  }
  loadSubmission(): Observable<{}> {
    return Observable.create((observer: Observer<{}>) => {
      try {
        this.formio
          .loadSubmission()
          .then((form: FormioForm) => {
            observer.next(form);
            observer.complete();
          })
          .catch((err: any) => observer.error(err));
      } catch (err) {
        observer.error(err);
      }
    });
  }
  saveSubmission(submission: {}): Observable<{}> {
    return Observable.create((observer: Observer<{}>) => {
      try {
        this.formio
          .saveSubmission(submission)
          .then((saved: {}) => {
            observer.next(saved);
            observer.complete();
          })
          .catch((err: any) => observer.error(err));
      } catch (err) {
        observer.error(err);
      }
    });
  }
  loadSubmissions(): Observable<{}> {
    return Observable.create((observer: Observer<{}>) => {
      try {
        this.formio
          .loadSubmissions()
          .then((submission: {}) => {
            observer.next(submission);
            observer.complete();
          })
          .catch((err: any) => observer.error(err));
      } catch (err) {
        observer.error(err);
      }
    });
  }
}
