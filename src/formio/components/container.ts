import { OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BaseComponent, BaseOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

export function Container(template:FormioTemplate) {
    class _Container extends BaseComponent<BaseOptions<any>> implements OnInit {
        formGroup: FormGroup = new FormGroup({});
        constructor() {
            super();
        }
        ngOnInit() {
            super.ngOnInit();
            this.form.registerControl(this.component.key,  this.formGroup);
        }
        getFormControl(): FormGroup | FormControl | FormArray {
            return this.formGroup;
        }
    }
    FormioComponents.register('container', _Container, {
        template: template.components.container
    });
    return _Container;
};