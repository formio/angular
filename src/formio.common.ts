import { BaseOptions } from './components/base';

/**
 * The form structure.
 */
export interface FormioForm {
    title?: string,
    name?: string,
    path?: string,
    project?: string,
    template?: string,
    components?: Array<BaseOptions<any>>
}

export interface AlertsOptions {
    submitMessage: string
}

export interface FormioAlert {
    type: string,
    message: string
}

export class FormioError {
    constructor (public message: string, public component: BaseOptions<any>) {}
}

export interface ErrorsOptions {
    message: string
}

export interface FormioOptions {
    errors: ErrorsOptions,
    alerts: AlertsOptions
}