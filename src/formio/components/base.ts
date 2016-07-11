import { Type, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormControl, FormArray, ValidatorFn, Validators } from '@angular/forms';
import define = require("core-js/fn/object/define");

export interface ConditionalOptions {
    show?: string,
    when?: string,
    eq?: any
}

export interface ValidateOptions {
    required?: boolean,
    custom?: string,
    customPrivate?: boolean
}

export interface ComponentOptions<T, V> {
    defaultValue?: T | Array<T>,
    type?: string,
    key?: string,
    label?: string,
    input?: boolean,
    required?: boolean,
    multiple?: boolean,
    protected?: boolean,
    unique?: boolean,
    persistent?: boolean,
    validate?: V,
    conditional?: ConditionalOptions
}

export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> {
}

export interface ComponentsOptions {
    components: Array<BaseOptions<any>>
}

export class BaseComponent<T> extends Type implements OnInit {
    control: FormControl | FormGroup;
    component: any;
    form: FormGroup;
    constructor() {
        super();
    }
    ngOnInit() {
        this.getControl();
    }
    get label() : string {
        if (this.component.label) {
            return this.component.label;
        }
        return this.component.key;
    }
    newControl(): FormGroup | FormControl {
        return new FormControl(this.component.defaultValue || '', this.getValidators());
    }
    getControl(): FormGroup | FormControl {
        if (!this.control) {
            this.control = this.newControl();
        }
        return this.control;
    }
    getError(type: string, error: any) : string {
        if ((type === 'required') && error) {
            return this.label + ' is required';
        }
        return '';
    }
    getValidators() : ValidatorFn[] {
        if (!this.component.validate) {
            return [];
        }
        let validators: ValidatorFn[] = [];
        if (this.component.validate.required) {
            validators.push(Validators.required);
        }
        return validators;
    }
}
