import { Component, Input, Output, Type, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponents } from './components/components';
import { FormioElement } from './formio-element.component';
import { FormioTemplate, RegisterTemplate } from './formio.template';
import { BaseOptions, BaseComponent } from './components/base';

@Component({
    selector: 'formio-component',
    template: '<div></div>',
    directives: [REACTIVE_FORM_DIRECTIVES, FormioElement]
})
export class FormioComponent<T> extends Type implements OnInit {
    components: Array<BaseComponent<any>> = [];
    container: FormArray = new FormArray([]);
    @Input() component: BaseOptions<T>;
    @Input() form: FormGroup;
    @Output() render: EventEmitter<any> = new EventEmitter();
    constructor() {
        super();
    }
    ngOnInit() {
        this.addComponent();
    }
    addComponent() {
        let component = FormioComponents.createComponent(this.component.type, this.form, this.component);

        // Add the form controls.
        if (this.component.input && this.component.key) {
            let control = component.getControl();
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

        // Add this to the instances.
        this.components.push(component);
        return component;
    }
    onRender() {
        this.render.emit(true);
    }
    removeAt(index:number) {
        this.container.removeAt(index);
        this.components.splice(index, 1);
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
            this.components.forEach((component: BaseComponent<any>) => {
                let error = component.getError(type, this.form.controls[this.component.key].errors[type]);
                if (error) {
                    errors.push(error);
                }
            });
        }
        return errors;
    }
}

export function FormioComponentRegister(template: FormioTemplate) {
    RegisterTemplate(FormioComponent, template.formio_component);
    return FormioComponent;
}