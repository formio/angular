import { EventEmitter } from '@angular/core';
import { FormioAppConfig } from '../../index';
export interface FormioResourceMap {
    [name: string]: any;
}
export declare class FormioResources {
    resources: FormioResourceMap;
    error: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor();
}
export declare class FormioResourceConfig {
    app?: FormioAppConfig;
    name: string;
    form: string;
    parents: Array<string>;
}
