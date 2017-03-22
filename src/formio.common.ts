export interface ConditionalOptions {
    show?: string,
    when?: any,
    eq?: any
}

export interface ValidateOptions {
    required?: boolean,
    custom?: string,
    customPrivate?: boolean
}

export interface ComponentOptions<T, V> {
    defaultValue?: T | Array<T>,
    type?: string,
    key?: string,
    label?: string,
    input?: boolean,
    required?: boolean,
    multiple?: boolean,
    protected?: boolean,
    unique?: boolean,
    persistent?: boolean,
    tableView?: boolean,
    lockKey?: boolean,
    validate?: V,
    conditional?: ConditionalOptions,
    customConditional?: string
}

export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> {
}

export interface FormioRefreshValue {
    property: string;
    value: Object;
}

export interface FormioForm {
    title?: string,
    display?: string,
    name?: string,
    path?: string,
    project?: string,
    template?: string,
    components?: Array<BaseOptions<any>>
}

export interface AlertsOptions {
    submitMessage: string
}

export interface ErrorsOptions {
    message: string
}

export class FormioError {
    constructor (public message: string, public component: BaseOptions<any> = null) {}
}

export interface FormioSubmissionCallback {
    (error: FormioError, submission: Object): void
}

export interface FormioBeforeSubmit {
    (submission: Object, callback: FormioSubmissionCallback): void;
}

export interface FormioHookOptions {
    beforeSubmit: FormioBeforeSubmit
}

export interface FormioOptions {
    errors: ErrorsOptions,
    alerts: AlertsOptions,
    hooks: FormioHookOptions
}
