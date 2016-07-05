import { ComponentResolver, ComponentFactory, Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES  } from '@angular/forms';

export interface FormioComponentMetaData {
    selector: string,
    template: string,
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
        metadata.directives = [REACTIVE_FORM_DIRECTIVES];
        metadata.inputs = ['component', 'form'];
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