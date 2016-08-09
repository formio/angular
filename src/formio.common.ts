import { EventEmitter } from '@angular/core';
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

export class FormioError {
    constructor (public message: string, public component: BaseOptions<any>) {}
}

export class FormioEvents {
    public component: EventEmitter<any>;
    public errors: Array<FormioError>;
    constructor() {
        this.component = new EventEmitter();
        this.errors = [];
    }
}

export interface ErrorsOptions {
    message: string
}

export interface FormioOptions {
    errors: ErrorsOptions
}