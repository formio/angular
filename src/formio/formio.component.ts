import 'reflect-metadata';
import { Component, Input, Type }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponentsComponent } from './formio-components.component';
import { FormioTemplate } from './formio';

export interface FormioForm {
    title?: string,
    name?: string,
    path?: string,
    project?: string,
    template?: string,
    components?: Array<{}>
}

/**
 * The <formio> component.
 */
@Component({
    selector: 'formio',
    template: '<div></div>',
    directives: [FormioComponentsComponent, REACTIVE_FORM_DIRECTIVES]
})
export class Formio extends Type {
    @Input() form: FormioForm = {};
    formGroup: FormGroup = new FormGroup({});
    constructor() {
        super();
    }
    onSubmit() {
        console.log(this.formGroup.value);
    }
}

/**
 * Allow dynamic altering of the component templates based on what template
 * they wish to load within their Form.io renderer.
 *
 * @param cmp - The component class to alter.
 * @param template - The template to add to this component.
 * @constructor
 */
export function FormioRegisterTemplate(cmp: Type, template: string, styles?: Array<string>) {
    //noinspection TypeScriptUnresolvedFunction
    let annotations = Reflect.getMetadata('annotations', cmp);
    annotations[0].template = template;
    if (styles) {
        annotations[0].styles = styles;
    }
    //noinspection TypeScriptUnresolvedFunction
    Reflect.defineMetadata('annotations', annotations, cmp);
}

/**
 * Form.io component registration method. This is used to dynamically load a template
 * into a component based on which template they wish to associate with Form.io
 *
 * @param template - The FormioTemplate object.
 * @returns {Formio}
 * @constructor
 */
export function FormioRegister(template: FormioTemplate) {
    FormioRegisterTemplate(Formio, template.formio, template.styles);
    return Formio;
}