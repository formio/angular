import { Injectable } from '@angular/core';
import { FormioAppConfig } from '../../index';

export interface FormioAuthFormConfig {
    path?: string;
    form?: string;
    component?: any;
}

@Injectable()
export class FormioAuthConfig {
    app: FormioAppConfig;
    component?: any;
    login?: FormioAuthFormConfig;
    register?: FormioAuthFormConfig;
}
