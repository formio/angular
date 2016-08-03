import { Component, Type } from '@angular/core';
import { FormioComponent } from '../formio/formio.component';
import { FORM } from '../fixtures/forms/kitchensink.ts';
@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [FormioComponent]
})
export class AppComponent extends Type {
    public form: any = FORM;
    onRender() {
        console.log('Rendered!');
    }
    onSubmit(value: any) {
        console.log(value);
    }
}