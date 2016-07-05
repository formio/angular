import { Component, Input, OnInit, Type }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponent } from './formio-component.component';
import { ComponentOptions } from './formio-component.component';

@Component({
    selector: 'formio',
    template: require('./formio.component.html'),
    directives: [FormioComponent, REACTIVE_FORM_DIRECTIVES]
})
export class Formio extends Type implements OnInit {
    @Input() components: Array<ComponentOptions<any>> = [];
    form: FormGroup;
    constructor() {
        super();
    }
    ngOnInit() {
        this.form = new FormGroup({});
    }
    onSubmit() {
        console.log(this.form.value);
    }
}