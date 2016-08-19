import { Component, Type } from '@angular/core';
import { FormioComponent } from '../src/formio.component';
import { FORM } from '../src/fixtures/forms/kitchensink.ts';
@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [FormioComponent]
})
export class AppComponent extends Type {
    public form: any = FORM;
    onRender() {
        console.log('onRender');
    }
    onSubmit(value: any) {
        console.log('onSubmit');
        console.log(value);
    }
    onChange() {
        console.log('onChange');
    }
}