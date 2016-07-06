import { Component, Input, Type }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponentsComponent } from './formio-components.component';
import { ComponentOptions } from './formio-component.component';

export interface FormioForm {
    title?: string,
    name?: string,
    path?: string,
    project?: string,
    template?: string,
    components?: Array<ComponentOptions<any>>
}

@Component({
    selector: 'formio',
    template: require('./formio.component.html'),
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