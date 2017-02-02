import { Observable } from 'rxjs/Observable';
import { FormioForm } from './formio.common';
export declare class FormioService {
    url: string;
    formio: any;
    constructor(url: string);
    loadForm(): Observable<FormioForm>;
    loadSubmission(): Observable<{}>;
    saveSubmission(submission: {}): Observable<{}>;
    loadSubmissions(): Observable<{}>;
}
