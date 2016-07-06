import { Component, Input, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioComponent } from './formio-component.component';
import { ComponentOptions } from './formio-component.component';

@Component({
    selector: 'formio-components',
    template: require('./formio-components.component.html'),
    directives: [FormioComponent]
})
export class FormioComponentsComponent extends Type {
    @Input() components: Array<ComponentOptions<any>>;
    @Input() form: FormGroup;
}