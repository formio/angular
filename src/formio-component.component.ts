import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormioComponents } from './components/components';
import { BaseOptions, BaseComponent } from './components/base';
import { FormioEvents, FormioError } from './formio.common';
var FormioUtils = require('formio-utils');

@Component({
    selector: 'formio-component',
    template: '<div></div>'
})
export class FormioComponentComponent<T> implements OnInit {
    show: Boolean = true;
    components: Array<BaseComponent<any>> = [];
    container: FormArray = new FormArray([]);
    @Input() component: BaseOptions<T>;
    @Input() form: FormGroup;
    @Input() data: any;
    @Input() submission: FormGroup;
    @Input() events: FormioEvents;
    @Input() label: string | boolean;
    @Output() render: EventEmitter<any> = new EventEmitter();
    ngOnInit() {
        // Add the initial component.
        this.addComponent();
        if (
            this.data &&
            this.component.multiple &&
            this.data.hasOwnProperty(this.component.key) &&
            (this.data[this.component.key] instanceof Array) &&
            (this.data[this.component.key].length > 1)
        ) {
            // Add other components if this is an array...
            for (var i = 1; i < this.data[this.component.key].length; i++) {
                this.addComponent();
            }
        }
        this.checkConditions();

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
                            this.checkConditions();
                            break;
                    }
                });
            });
        }
    }
    getData(key: number | string) : any {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key];
        }
        else {
            return {};
        }
    }
    checkConditions() {
        var subData = this.submission ? this.submission.value : {};
        var compData = Object.assign({}, subData, this.form.value);
        this.show = FormioUtils.checkCondition(this.component, compData);
    }
    addComponent() {
        let component = FormioComponents.createComponent(
            this.component.type,
            this.form,
            this.component,
            this.data
        );

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
