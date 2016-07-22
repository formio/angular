import { Type, Input } from "@angular/core";
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import define = require("core-js/fn/object/define");

export interface ConditionalOptions {
    show?: string,
    when?: any,
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
    tableView?: boolean,
    lockKey?: boolean,
    validate?: V,
    conditional?: ConditionalOptions
}

export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> {
}

export interface ComponentsOptions {
    components: Array<BaseOptions<any>>
}

/**
 * Create the custom validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
export function CustomValidator(custom: string, form: FormGroup) {
    return function(control: FormControl) {
        var valid = true;
        /*eslint-disable no-unused-vars */
        var input = control.value;
        /*eslint-enable no-unused-vars */
        custom = custom.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
            return form.value[$2];
        });

        /* jshint evil: true */
        eval(custom);
        return (valid === true) ? null : {custom: valid};
    };
}

export class BaseComponent<T> {
    control: FormControl | FormGroup;
    index: number = 0;
    constructor(public form: FormGroup, public settings: any) {
        this.getControl();
    }
    get label() : string {
        if (this.settings.label) {
            return this.settings.label;
        }
        return this.settings.key;
    }
    get defaultValue(): T {
        if (this.settings.defaultValue) {
            let isArray = (this.settings.defaultValue instanceof Array);
            return isArray ? this.settings.defaultValue[this.index] : this.settings.defaultValue;
        }
        return this.settings.defaultValue;
    }
    getControl(): FormGroup | FormControl {
        if (!this.control) {
            this.control = new FormControl(this.defaultValue, this.getValidators());
        }
        return this.control;
    }
    getError(type: string, error: any) : string {
        if ((type === 'required') && error) {
            return this.label + ' is required';
        }
        if ((type === 'custom') && error) {
            return error;
        }
        return '';
    }
    getValidators() : ValidatorFn[] {
        if (!this.settings.validate) {
            return [];
        }
        let validators: ValidatorFn[] = [];
        if (this.settings.validate.required) {
            validators.push(Validators.required);
        }
        if (this.settings.validate.custom) {
            validators.push(CustomValidator(this.settings.validate.custom, this.form));
        }
        return validators;
    }
}

export class BaseElement extends Type {
    @Input() component: BaseComponent<any>;
    @Input() hideLabel: boolean = false;
}
