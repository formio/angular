import { Component, Input, Type, OnInit, ComponentResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponents } from './components/components';
import { FormioRegisterTemplate } from './formio.component';
import { FormioTemplate } from './formio';
import { BaseOptions } from './components/base';

@Component({
    selector: 'formio-component',
    template: '<div></div>',
    directives: [REACTIVE_FORM_DIRECTIVES],
    providers: [FormioComponents]
})
export class FormioComponent<T> extends Type implements OnInit {
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
            cmpRef.instance.component = this.component;
            cmpRef.instance.form = this.form;
            let formControl = this.component.required ?
                new FormControl(this.component.value || '', Validators.required) :
                new FormControl(this.component.value || '');
            this.form.registerControl(this.component.key,  formControl);
        });
    }
    get isValid() {
        if (this.form.controls.hasOwnProperty(this.component.key)) {
            return this.form.controls[this.component.key].pristine || this.form.controls[this.component.key].valid;
        }
        return false;
    }
}

export function FormioComponentRegister(template: FormioTemplate) {
    FormioRegisterTemplate(FormioComponent, template.formio_component);
    return FormioComponent;
}