import { Component, Input, Output, Type, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormioComponents } from './components/components';
import { BaseOptions, BaseComponent } from './components/base';
import { FormioEvents, FormioError } from './formio.common';
var FormioUtils = require('formio-utils');

@Component({
    selector: 'formio-component',
    template: '<div></div>'
})
export class FormioComponentComponent<T> extends Type implements OnInit {
    show: Boolean = true;
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
        // Hide by default if there are conditions for this control.
        if (this.hasConditions()) {
            this.show = false;
        }
        
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
                            this.checkConditions();
                            break;
                    }
                });
            });
        }
    }
    hasConditions() {
        return (
            this.component.customConditional ||
            (
                this.component.conditional
                && (this.component.conditional.show !== null && this.component.conditional.show !== '')
                && (this.component.conditional.when !== null && this.component.conditional.when !== '')
            )
        );
    }
    checkConditions() {
        // Ensure we have conditionals to check.
        if (this.hasConditions()) {
            var boolean = {'true': true, 'false': false};
            if (this.component.customConditional) {
                try {
                    // Create a child block, and expose the submission data.
                    var data = this.form.value; // eslint-disable-line no-unused-vars
                    // Eval the custom conditional and update the show value.
                    var show = eval('(function() { ' + this.component.customConditional.toString() + '; return show; })()');
                    // Show by default, if an invalid type is given.
                    this.show = boolean.hasOwnProperty(show.toString()) ? boolean[show] : true;
                }
                catch (err) {
                    this.show = true;
                }
            }
            else {
                this.component.conditional.eq = this.component.conditional.eq || '';
                let shouldShow = boolean.hasOwnProperty(this.component.conditional.show)
                    ? boolean[this.component.conditional.show]
                    : true;
                let conditionValue = boolean.hasOwnProperty(this.component.conditional.eq)
                    ? boolean[this.component.conditional.eq]
                    : this.component.conditional.eq;
                let value = FormioUtils.getValue({data: this.form.value}, this.component.conditional.when);
                let equal = (value === conditionValue);
                this.show = (shouldShow && equal) || (!shouldShow && !equal);
            }
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
