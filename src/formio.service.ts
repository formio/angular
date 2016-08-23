var Formio = require('formiojs');
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormioForm } from './formio.common';
export class FormioService {
    constructor(public url: string) {}
    loadForm(): Observable<FormioForm> {
        return Observable.create((observer:Observer<FormioForm>) => {
            (new Formio(this.url)).loadForm().then((form: FormioForm) => {
                observer.next(form);
                observer.complete();
            });
        });
    }
    saveSubmission(submission: {}): Observable<{}> {
        return Observable.create((observer: Observer<{}>) => {
            (new Formio(this.url)).saveSubmission(submission).then((submission: {}) => {
                observer.next(submission);
                observer.complete();
            });
        });
    }
    loadSubmissions(): Observable<{}>{
        return Observable.create((observer: Observer<{}>) => {
            (new Formio(this.url)).loadSubmissions().then((submission: {}) => {
                observer.next(submission);
                observer.complete();
            });
        });
    }
}
