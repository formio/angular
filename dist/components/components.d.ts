import { Compiler, ComponentFactory } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioComponentMetaData, FormioComponentTemplate } from '../formio.template';
export interface FormioComponentWrapper {
    component?: any;
    element?: any;
    metadata?: FormioComponentMetaData;
    module?: any;
    factoryPromise?: Promise<ComponentFactory<any>>;
}
export declare class FormioComponents {
    static components: FormioComponentWrapper;
    static register(name: string, component: any, element: any, template: FormioComponentTemplate): void;
    static createComponent(name: string, form: FormGroup, component: any, data: any): any;
    static element(name: string, compiler: Compiler): Promise<ComponentFactory<any>>;
}
