import { Component, Input, Type, OnInit } from '@angular/core';
import { FormGroup, FormArray, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioElement } from './formio-element.component';
import { FormioComponents } from './components/components';
import { FormioRegisterTemplate } from './formio.component';
import { FormioTemplate } from './formio';
import { BaseOptions, BaseComponent } from './components/base';

@Component({
    selector: 'formio-component',
    template: '<div></div>',
    directives: [REACTIVE_FORM_DIRECTIVES, FormioElement],
    providers: [FormioComponents]
})
export class FormioComponent<T> extends Type implements OnInit {
    values: Array<T> = [];
    instances: Array<BaseComponent<any>> = [];
    container: FormArray = new FormArray([]);
    @Input() component: BaseOptions<T>;
    @Input() form: FormGroup;
    constructor() {
        super();
    }
    ngOnInit() {
        let isArray = this.component.defaultValue instanceof Array;
        this.values = isArray ? this.component.defaultValue : [this.component.defaultValue];
    }
    onElementAdd(cmpRef: any) {
        this.instances.push(cmpRef.instance);
        if (this.component.input && this.component.key) {
            let control = cmpRef.instance.getControl();
            if (control) {
                if (this.component.multiple) {
                    this.container.push(control);
                    this.form.addControl(this.component.key, this.container)
                }
                else {
                    this.form.addControl(this.component.key, control);
                }
            }
        }
    }
    addAnother() {
        this.values.push(this.component.defaultValue);
    }
    get errors(): Array<string> {
        if (!this.component.input) {
            return [];
        }
        if (!this.form.controls.hasOwnProperty(this.component.key)) {
            return [];
        }
        if (this.form.controls[this.component.key].pristine) {
            return [];
        }
        if (this.form.controls[this.component.key].valid) {
            return [];
        }
        let errors: Array<string> = [];
        for (let type in this.form.controls[this.component.key].errors) {
            this.instances.forEach((instance: BaseComponent<any>) => {
                let error = instance.getError(type, this.form.controls[this.component.key].errors[type]);
                if (error) {
                    errors.push(error);
                }
            });
        }
        return errors;
    }
}

export function FormioComponentRegister(template: FormioTemplate) {
    FormioRegisterTemplate(FormioComponent, template.formio_component);
    return FormioComponent;
}