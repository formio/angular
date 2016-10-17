import { EventEmitter } from '@angular/core';
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
export declare class FormioError {
    message: string;
    component: BaseOptions<any>;
    constructor(message: string, component: BaseOptions<any>);
}
export declare class FormioEvents {
    component: EventEmitter<any>;
    errors: Array<FormioError>;
    constructor();
}
export interface ErrorsOptions {
    message: string;
}
export interface FormioOptions {
    errors: ErrorsOptions;
}
