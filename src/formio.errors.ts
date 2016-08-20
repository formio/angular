import { Component, Input, OnInit } from '@angular/core';
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
