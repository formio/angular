import { BaseOptions } from './components/base';
/**
 * The form structure.
 */
export interface FormioForm {
    title?: string;
    name?: string;
    path?: string;
    project?: string;
    template?: string;
    components?: Array<BaseOptions<any>>;
}
export interface AlertsOptions {
    submitMessage: string;
}
export interface FormioAlert {
    type: string;
    message: string;
}
export declare class FormioError {
    message: string;
    component: BaseOptions<any>;
    constructor(message: string, component: BaseOptions<any>);
}
export interface ErrorsOptions {
    message: string;
}
export interface FormioSubmissionCallback {
    (error: FormioError, submission: Object): void;
}
export interface FormioBeforeSubmit {
    (submission: Object, callback: FormioSubmissionCallback): void;
}
export interface FormioHookOptions {
    beforeSubmit: FormioBeforeSubmit;
}
export interface FormioOptions {
    errors: ErrorsOptions;
    alerts: AlertsOptions;
    hooks: FormioHookOptions;
}
