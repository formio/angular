import { ComponentResolver, ComponentFactory, Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES  } from '@angular/forms';
import { FormioComponentsComponent } from '../formio-components.component';
import { FormioComponent } from '../formio-component.component';

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

export class FormioComponents {
    public static components:{} = {};
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
    public static component(
        name: string,
        resolver: ComponentResolver
    ) : Promise<ComponentFactory<any>> {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            return null;
        }
        let component = FormioComponents.components[name];
        const decoratedCmp = Component(component.metadata)(component.component);
        return resolver.resolveComponent(decoratedCmp);
    }
}