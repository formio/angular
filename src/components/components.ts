import { Compiler, ComponentFactory, Component } from '@angular/core';
import { FormGroup  } from '@angular/forms';

export interface FormioComponentsTemplate {
    button: string,
    columns: string,
    container: string,
    datagrid: string,
    input: string,
    textarea: string,
    hidden: string,
    radio: string,
    checkbox: string,
    custom: string,
    table: string,
    panel: string,
    fieldset: string,
    well: string,
    selectboxes: string,
    content: string,
    htmlelement: string,
    currency: string,
    select: string,
    survey: string
}

export interface FormioComponentMetaData {
    template: string,
    selector?: string,
    inputs?: Array<string>,
    directives?: Array<any>
}

export interface FormioComponentWrapper {
    component?: any,
    element?: any,
    metadata?: FormioComponentMetaData
}

export class FormioComponents {
    public static components:FormioComponentWrapper = {};
    public static register(
        name: string,
        component: any,
        element: any,
        metadata: FormioComponentMetaData
    ) {
        metadata.selector = metadata.selector || 'formio-' + name;
        metadata.inputs = metadata.inputs || ['component', 'form'];
        FormioComponents.components[name] = {
            component: component,
            element: element,
            metadata: metadata
        };
    }
    public static createComponent(name: string, form: FormGroup, component: any) : any {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        let comp: FormioComponentWrapper = FormioComponents.components[name];
        return new comp.component(form, component);
    }
    public static element(
        name: string,
        compiler: Compiler
    ) : Promise<ComponentFactory<any>> {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        let component: FormioComponentWrapper = FormioComponents.components[name];
        const decoratedCmp = Component(component.metadata)(component.element);
        //noinspection TypeScriptValidateTypes
        return compiler.compileComponentAsync(decoratedCmp);
    }
}
