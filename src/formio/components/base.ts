import { Type } from "@angular/core";
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
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
    value?: T,
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

export class BaseComponent<T> extends Type {
    component: any;
    form: FormGroup;
    constructor() {
        super();
    }
    get label() : string {
        if (this.component.label) {
            return this.component.label;
        }
        return this.component.key;
    }
    getFormControl(): FormGroup | FormControl {
        return new FormControl(this.component.value || '', this.getValidators());
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

export class SimpleComponent extends BaseComponent<BaseOptions<any>> {
    constructor() {
        super();
    }
}