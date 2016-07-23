import 'reflect-metadata';
import { Component, Input, Output, Type, EventEmitter }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponentsComponent } from './formio-components.component';
import { FormioTemplate, RegisterTemplate } from './formio.template';

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
    @Output() render: EventEmitter<any> = new EventEmitter();
    @Output() submit: EventEmitter<any> = new EventEmitter();
    formGroup: FormGroup = new FormGroup({});
    constructor() {
        super();
    }
    onRender() {
        this.render.emit(true);
    }
    onSubmit() {
        this.submit.emit(this.formGroup.value);
    }
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
    RegisterTemplate(Formio, template.formio, template.styles);
    return Formio;
}