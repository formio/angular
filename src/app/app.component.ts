import { Component, Type } from '@angular/core';
import { Formio, FormioForm } from '../formio/formio.component';
import { FormService } from './form.service';
@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [Formio],
    providers:  [FormService]
})
export class AppComponent extends Type {
    form: FormioForm;
    constructor(service: FormService) {
        super();
        this.form = service.getForm();
    }
}