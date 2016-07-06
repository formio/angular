import { Component, Type } from '@angular/core';
import { Formio, FormioForm } from './formio/formio.component';
import { FormService } from './form.service';
@Component({
    selector: 'app',
    template: `
        <div>
          <formio [form]="form"></formio>
        </div>
    `,
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