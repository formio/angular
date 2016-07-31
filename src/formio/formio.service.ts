var Formio = require('formiojs');
import { BaseOptions } from './components/base';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export interface FormioForm {
    title?: string,
    name?: string,
    path?: string,
    project?: string,
    template?: string,
    components?: Array<BaseOptions<any>>
}

export class FormioService {
    private _form: FormioForm;
    constructor(public url: string) {}
    loadForm(): Observable<FormioForm> {
        return Observable.create((observer:Observer<FormioForm>) => {
            if (this._form) {
                observer.next(this._form);
                observer.complete();
            }
            else {
                (new Formio(this.url)).loadForm().then((form: FormioForm) => {
                    this._form = form;
                    observer.next(form);
                    observer.complete();
                });
            }
        });
    }
    submit(submission: {}): Observable<{}> {
        return Observable.create((observer: Observer<{}>) => {
            (new Formio(this.url)).saveSubmission(submission).then((submission: {}) => {
                observer.next(submission);
                observer.complete();
            });
        });
    }
}