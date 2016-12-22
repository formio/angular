import { Type, NgModule } from '@angular/core';
let Reflect = require('core-js/es7/reflect');

export interface FormioComponentMetaData {
    template?: string,
    selector?: string,
    inputs?: Array<string>,
    styles?: Array<string>
}

export interface FormioComponentTemplate {
    component: FormioComponentMetaData,
    module?: NgModule
}

export interface FormioComponentsTemplate {
    button: FormioComponentTemplate,
    columns: FormioComponentTemplate,
    container: FormioComponentTemplate,
    datagrid: FormioComponentTemplate,
    input: FormioComponentTemplate,
    number: FormioComponentTemplate,
    textarea: FormioComponentTemplate,
    hidden: FormioComponentTemplate,
    radio: FormioComponentTemplate,
    checkbox: FormioComponentTemplate,
    custom: FormioComponentTemplate,
    table: FormioComponentTemplate,
    panel: FormioComponentTemplate,
    fieldset: FormioComponentTemplate,
    well: FormioComponentTemplate,
    datetime: FormioComponentTemplate,
    selectboxes: FormioComponentTemplate,
    content: FormioComponentTemplate,
    html: FormioComponentTemplate,
    currency: FormioComponentTemplate,
    select: FormioComponentTemplate,
    survey: FormioComponentTemplate,
    resource: FormioComponentTemplate,
    address: FormioComponentTemplate,
    phoneNumber: FormioComponentTemplate,
    signature: FormioComponentTemplate
    day: FormioComponentTemplate
}

/**
 * The Form.io template interface.
 *
 * Defines all the fields and components necessary to create a Form.io form
 * rendering template.
 */
export interface FormioTemplate {
    formio: FormioComponentTemplate,
    formio_component: FormioComponentTemplate;
    formio_wizard: FormioComponentTemplate;
    formio_components: FormioComponentTemplate;
    errors: FormioComponentTemplate;
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
export function RegisterTemplate(cmp: Type<any>, template: FormioComponentTemplate) {
    //noinspection TypeScriptUnresolvedFunction
    let annotations = Reflect.getMetadata('annotations', cmp);
    annotations[0].template = template.component.template;
    if (template.component.styles) {
        annotations[0].styles = template.component.styles;
    }
    //noinspection TypeScriptUnresolvedFunction
    Reflect.defineMetadata('annotations', annotations, cmp);
}