import { Type } from "@angular/core";
import { FormGroup } from '@angular/forms';
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
    component: T;
    form: FormGroup;
    constructor() {
        super();
    }
}

export class SimpleComponent extends BaseComponent<BaseOptions<any>> {
    constructor() {
        super();
    }
}