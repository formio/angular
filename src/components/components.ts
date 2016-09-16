import {
    NgModule,
    NgModuleMetadataType,
    Compiler,
    ModuleWithComponentFactories,
    Component
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup  } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { FormioModule } from '../formio';

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
    datetime: string,
    selectboxes: string,
    content: string,
    htmlelement: string,
    currency: string,
    select: string,
    survey: string,
    resource: string,
    address: string
}

export interface FormioComponentMetaData {
    template?: string,
    selector?: string,
    inputs?: Array<string>,
    directives?: Array<any>,
    styles?: Array<string>
}

export interface FormioComponentWrapper {
    component?: any,
    element?: any,
    metadata?: FormioComponentMetaData,
    module?: any
}

export class FormioComponents {
    public static components:FormioComponentWrapper = {};
    public static register(
        name: string,
        component: any,
        element: any,
        metadata: FormioComponentMetaData,
        module?: NgModuleMetadataType
    ) {
        module = module || {};
        metadata.selector = metadata.selector || 'formio-' + name;
        metadata.inputs = metadata.inputs || ['component', 'form'];
        const decoratedCmp = Component(metadata)(element);
        if (!module.declarations) {
            module.declarations = [];
        }
        module.declarations.push(decoratedCmp);
        if (!module.imports) {
            module.imports = [];
        }
        module.imports.push(CommonModule);
        module.imports.push(ReactiveFormsModule);
        module.imports.push(FormioModule);
        @NgModule(module)
        class DynamicComponentModule {}
        FormioComponents.components[name] = {
            component: component,
            element: element,
            metadata: metadata,
            module: DynamicComponentModule
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
    ) : Promise<ModuleWithComponentFactories<any>> {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        let component: FormioComponentWrapper = FormioComponents.components[name];
        return compiler.compileModuleAndAllComponentsAsync(component.module);
    }
}
