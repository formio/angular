import { Injectable, EventEmitter, Optional } from '@angular/core';
import { FormioAppConfig } from '../../index';

export interface FormioResourceMap {
    [name: string]: any;
}

@Injectable()
export class FormioResources {
    resources: FormioResourceMap = {};
    error: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor() {
        this.error = new EventEmitter();
        this.onError = this.error;
        this.resources = {};
    }
}

@Injectable()
export class FormioResourceConfig {
    name: string;
    form: string;
    parents: Array<string>;
    constructor(@Optional() public app?: FormioAppConfig) {}
}
