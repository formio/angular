import { NgModule, Compiler, Component, ComponentFactory } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup  } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { FormioBaseModule } from '../formio';
import { FormioComponentMetaData, FormioComponentTemplate } from '../formio.template';
let find = require('lodash/find');
let cloneDeep = require('lodash/cloneDeep');

export interface FormioComponentWrapper {
    component?: any,
    element?: any,
    metadata?: FormioComponentMetaData,
    module?: any,
    factoryPromise?: Promise<ComponentFactory<any>>
}

export class FormioComponents {
    public static components:FormioComponentWrapper = {};
    public static register(
        name: string,
        component: any,
        element: any,
        template: FormioComponentTemplate
    ) {
        let compTemplate = cloneDeep(template);
        compTemplate.module = compTemplate.module || {};
        compTemplate.component.selector = compTemplate.component.selector || 'formio-' + name;
        compTemplate.component.inputs = compTemplate.component.inputs || ['component', 'form'];
        const decoratedCmp = Component(compTemplate.component)(element);
        if (!compTemplate.module.declarations) {
            compTemplate.module.declarations = [];
        }
        compTemplate.module.declarations.push(decoratedCmp);
        if (!compTemplate.module.imports) {
            compTemplate.module.imports = [];
        }
        compTemplate.module.imports.push(CommonModule);
        compTemplate.module.imports.push(ReactiveFormsModule);
        compTemplate.module.imports.push(FormioBaseModule);
        @NgModule(compTemplate.module)
        class DynamicComponentModule {}
        FormioComponents.components[name] = {
            component: component,
            element: element,
            metadata: compTemplate.component,
            module: DynamicComponentModule,
            factory: null
        };
    }
    public static createComponent(name: string, form: FormGroup, component: any, data: any) : any {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        let comp: FormioComponentWrapper = FormioComponents.components[name];
        return new comp.component(form, component, data);
    }
    public static element(
        name: string,
        compiler: Compiler
    ) : Promise<ComponentFactory<any>> {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        if (FormioComponents.components[name].factoryPromise) {
            return FormioComponents.components[name].factoryPromise;
        }
        FormioComponents.components[name].factoryPromise = compiler.compileModuleAndAllComponentsAsync(FormioComponents.components[name].module)
        .then((moduleWithFactories) => {
            let factory = find(moduleWithFactories.componentFactories, {selector: 'formio-' + name});
            return factory;
        });
        return FormioComponents.components[name].factoryPromise;
    }
}
