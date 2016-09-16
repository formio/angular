import { Component, Type } from '@angular/core';
import { FORM } from '../src/fixtures/forms/simple.ts';
@Component({
    selector: 'app',
    template: require('./app.html')
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
    onChange(value: any) {
        console.log('onChange');
        console.log(value);
    }
}