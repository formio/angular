import { ComponentResolver, ComponentFactory, Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES  } from '@angular/forms';
import { FormioComponentsComponent } from '../formio-components.component';
import { FormioComponent } from '../formio-component.component';
import { BaseComponent } from './base';

export interface FormioComponentsTemplate {
    textfield: string,
    button: string,
    columns: string
}

export interface FormioComponentMetaData {
    template: string,
    selector?: string,
    directives?: Array<any>,
    inputs?: Array<string>
}

export interface FormioComponentWrapper {
    component?: any,
    metadata?: FormioComponentMetaData
}

export class FormioComponents {
    public static components:FormioComponentWrapper = {};
    public static register(
        name: string,
        component: any,
        metadata: FormioComponentMetaData
    ) {
        metadata.selector = metadata.selector || 'formio-' + name;
        metadata.directives = metadata.directives || [
            REACTIVE_FORM_DIRECTIVES,
            FormioComponentsComponent,
            FormioComponent
        ];
        metadata.inputs = metadata.inputs || ['component', 'form'];
        FormioComponents.components[name] = {
            component: component,
            metadata: metadata
        };
    }
    public static component(name: string) : FormioComponentWrapper {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            return null;
        }
        return FormioComponents.components[name];
    }
    public static componentFactory(
        component: FormioComponentWrapper,
        resolver: ComponentResolver
    ) : Promise<ComponentFactory<any>> {
        if (!component) {
            return null;
        }
        const decoratedCmp = Component(component.metadata)(component.component);
        return resolver.resolveComponent(decoratedCmp);
    }
}