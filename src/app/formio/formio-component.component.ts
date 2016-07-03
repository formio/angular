import { Component, Input, Type } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ComponentBase }     from './components/base';
@Component({
    selector: 'formio-component',
    template: require('./formio-component.component.html'),
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class FormioComponent extends Type {
    @Input() component: ComponentBase<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.component.settings.key].valid; }
}