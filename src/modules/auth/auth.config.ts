import { Injectable, Optional } from '@angular/core';
import { FormioAppConfig } from '../../index';

export interface FormioAuthFormConfig {
    path?: string;
    form?: string;
    component?: any;
}

@Injectable()
export class FormioAuthConfig {
    component?: any;
    login?: FormioAuthFormConfig;
    register?: FormioAuthFormConfig;
    constructor(@Optional() public app?: FormioAppConfig) {}
}
