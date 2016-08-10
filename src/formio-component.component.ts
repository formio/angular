import { Component, Input, Output, Type, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponents } from './components/components';
import { FormioElement } from './formio-element.component';
import { FormioTemplate, RegisterTemplate } from './formio.template';
import { BaseOptions, BaseComponent } from './components/base';
import { FormioEvents, FormioError } from './formio.common';

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
    @Input() events: FormioEvents;
    @Input() label: string | boolean;
    @Output() render: EventEmitter<any> = new EventEmitter();
    constructor() {
        super();
    }
    ngOnInit() {
        // Add this component.
        this.addComponent();

        // Subscribe to the invalid event.
        if (this.events) {
            this.events.component.subscribe((type: string) => {
                this.components.forEach((component: BaseComponent<any>) => {
                    switch (type) {
                        case 'invalid':
                            component.control.markAsDirty(true);
                            let errors: Array<FormioError> = component.errors;
                            if (errors.length) {
                                this.events.errors = this.events.errors.concat(errors);
                            }
                            break;
                        case 'valueChanges':
                            console.log('value changed!');
                            break;
                    }
                });
            });
        }
    }
    addComponent() {
        let component = FormioComponents.createComponent(this.component.type, this.form, this.component);

        // Set the index.
        component.index = this.components.length;

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
        this.components.forEach((component: BaseComponent<any>) => {
            let compErrs: Array<FormioError> = component.errors;
            compErrs.forEach((compError) => {
                errors.push(compError.message);
            });
        });
        return errors;
    }
}

export function FormioComponentRegister(template: FormioTemplate) {
    RegisterTemplate(FormioComponent, template.formio_component);
    return FormioComponent;
}