import { Type } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { ComponentOptions } from '../formio-component.component';
export class BaseComponent extends Type {
    component: ComponentOptions<string>;
    form: FormGroup;
    constructor() {
        super();
    }
}