var Formio = require('formiojs');
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormioForm } from './formio.common';
export class FormioService {
    public formio: any;
    constructor(public url: string) {
        this.formio = new Formio(this.url);
    }
    loadForm(): Observable<FormioForm> {
        return Observable.create((observer:Observer<FormioForm>) => {
            this.formio.loadForm().then((form: FormioForm) => {
                observer.next(form);
                observer.complete();
            });
        });
    }
    loadSubmission(): Observable<{}> {
        return Observable.create((observer:Observer<{}>) => {
            this.formio.loadSubmission().then((form: FormioForm) => {
                observer.next(form);
                observer.complete();
            });
        });
    }
    saveSubmission(submission: {}): Observable<{}> {
        return Observable.create((observer: Observer<{}>) => {
            this.formio.saveSubmission(submission).then((submission: {}) => {
                observer.next(submission);
                observer.complete();
            });
        });
    }
    loadSubmissions(): Observable<{}>{
        return Observable.create((observer: Observer<{}>) => {
            this.formio.loadSubmissions().then((submission: {}) => {
                observer.next(submission);
                observer.complete();
            });
        });
    }
}
