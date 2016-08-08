import { Component, Input, OnInit } from '@angular/core';
import { FormioTemplate, RegisterTemplate } from './formio.template';
import { FormioError, ErrorsOptions } from './formio.common';

@Component({
    selector: 'formio-errors',
    template: '<div></div>'
})
export class FormioErrors implements OnInit {
    @Input() errors: Array<FormioError> = [];
    @Input() options: ErrorsOptions;
    ngOnInit() {
        this.options = Object.assign({
            message: 'Please fix the following errors before submitting.'
        }, this.options);
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
export function FormioErrorsRegister(template: FormioTemplate) {
    RegisterTemplate(FormioErrors, template.errors);
    return FormioErrors;
}