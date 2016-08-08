import { Type } from '@angular/core';
import { FormioComponentsTemplate } from './components/components';

/**
 * The Form.io template interface.
 *
 * Defines all the fields and components necessary to create a Form.io form
 * rendering template.
 */
export interface FormioTemplate {
    styles?: Array<string>,
    formio: string,
    formio_component: string;
    formio_components: string;
    errors: string;
    components: FormioComponentsTemplate;
};

/**
 * Allow dynamic altering of the component templates based on what template
 * they wish to load within their Form.io renderer.
 *
 * @param cmp - The component class to alter.
 * @param template - The template to add to this component.
 * @constructor
 */
export function RegisterTemplate(cmp: Type, template: string, styles?: Array<string>) {
    //noinspection TypeScriptUnresolvedFunction
    let annotations = Reflect.getMetadata('annotations', cmp);
    annotations[0].template = template;
    if (styles) {
        annotations[0].styles = styles;
    }
    //noinspection TypeScriptUnresolvedFunction
    Reflect.defineMetadata('annotations', annotations, cmp);
}