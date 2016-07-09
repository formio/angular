import { Component, ComponentRef, Input, Type, OnInit, ComponentResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponents } from './components/components';
import { FormioRegisterTemplate } from './formio.component';
import { FormioTemplate } from './formio';
import { BaseOptions, BaseComponent } from './components/base';

@Component({
    selector: 'formio-component',
    template: '<div></div>',
    directives: [REACTIVE_FORM_DIRECTIVES],
    providers: [FormioComponents]
})
export class FormioComponent<T> extends Type implements OnInit {
    instance: BaseComponent<any>;
    @Input() component: BaseOptions<T>;
    @Input() form: FormGroup;
    @ViewChild("formioElement", { read: ViewContainerRef }) element: ViewContainerRef;
    constructor(private resolver: ComponentResolver) {
        super();
    }
    ngOnInit() {
        let component = FormioComponents.component(this.component.type,  this.resolver);
        if (!component) {
            return;
        }

        component.then(cmpFactory => {
            let cmpRef = this.element.createComponent(cmpFactory);
            this.instance = cmpRef.instance;
            this.instance.component = this.component;
            this.instance.form = this.form;
            if (this.component.input && this.component.key) {
                this.form.registerControl(this.component.key,  this.instance.getFormControl());
            }
        });
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
            let error = this.instance.getError(type, this.form.controls[this.component.key].errors[type]);
            if (error) {
                errors.push(error);
            }
        }
        return errors;
    }
}

export function FormioComponentRegister(template: FormioTemplate) {
    FormioRegisterTemplate(FormioComponent, template.formio_component);
    return FormioComponent;
}