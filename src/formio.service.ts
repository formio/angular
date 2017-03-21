import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormioForm } from './formio.common';
let Formio = require('formiojs');

export class FormioService {
    public formio: any;
    constructor(public url: string) {
        this.formio = new Formio(this.url);
    }
    loadForm(): Observable<FormioForm> {
        return Observable.create((observer: Observer<FormioForm>) => {
            try {
                this.formio.loadForm().then((form: FormioForm) => {
                    observer.next(form);
                    observer.complete();
                }).catch((err: any) => observer.error(err));
            }
            catch (err) {
                observer.error(err);
            }
        });
    }
    loadSubmission(): Observable<{}> {
        return Observable.create((observer: Observer<{}>) => {
            try {
                this.formio.loadSubmission().then((form: FormioForm) => {
                    observer.next(form);
                    observer.complete();
                }).catch((err: any) => observer.error(err));
            }
            catch (err) {
                observer.error(err);
            }
        });
    }
    saveSubmission(submission: {}): Observable<{}> {
        return Observable.create((observer: Observer<{}>) => {
            try {
                this.formio.saveSubmission(submission).then((submission: {}) => {
                    observer.next(submission);
                    observer.complete();
                }).catch((err: any) => observer.error(err));
            }
            catch (err) {
                observer.error(err);
            }
        });
    }
    loadSubmissions(): Observable<{}>{
        return Observable.create((observer: Observer<{}>) => {
            try {
                this.formio.loadSubmissions().then((submission: {}) => {
                    observer.next(submission);
                    observer.complete();
                }).catch((err: any) => observer.error(err));
            }
            catch (err) {
                observer.error(err);
            }
        });
    }
}
