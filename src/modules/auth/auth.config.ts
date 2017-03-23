import { Injectable } from '@angular/core';

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
}
