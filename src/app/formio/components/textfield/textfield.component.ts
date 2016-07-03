import { Component, Type } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
@Component({
    selector: 'formio-textfield',
    template: require('./textfield.html'),
    directives: [REACTIVE_FORM_DIRECTIVES],
})
export class TextFieldComponent extends Type {
    constructor() {
        super();
    }
}