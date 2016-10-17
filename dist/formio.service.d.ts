import { Observable } from 'rxjs/Observable';
import { FormioForm } from './formio.common';
export declare class FormioService {
    url: string;
    constructor(url: string);
    loadForm(): Observable<FormioForm>;
    saveSubmission(submission: {}): Observable<{}>;
    loadSubmissions(): Observable<{}>;
}
