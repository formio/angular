import { Component, Input, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioRegisterTemplate } from './formio.component';
import { FormioComponent } from './formio-component.component';
import { BaseOptions } from './components/base';
import { FormioTemplate } from './formio';

@Component({
    selector: 'formio-components',
    template: '<div></div>',
    directives: [FormioComponent]
})
export class FormioComponentsComponent extends Type {
    @Input() components: Array<BaseOptions<any>>;
    @Input() form: FormGroup;
}

export function FormioComponentsComponentRegister(template: FormioTemplate) {
    FormioRegisterTemplate(FormioComponentsComponent, template.formio_components);
    return FormioComponent;
}