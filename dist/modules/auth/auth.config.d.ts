export interface FormioAuthFormConfig {
    path?: string;
    form?: string;
    component?: any;
}
export declare class FormioAuthConfig {
    component?: any;
    login?: FormioAuthFormConfig;
    register?: FormioAuthFormConfig;
}
