import { FormioAppConfig } from '../../index';
export interface FormioAuthFormConfig {
    path?: string;
    form?: string;
    component?: any;
}
export declare class FormioAuthConfig {
    app?: FormioAppConfig;
    component?: any;
    login?: FormioAuthFormConfig;
    register?: FormioAuthFormConfig;
}
