import { EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { FormioEvents, FormioError } from '../formio.common';
export interface ConditionalOptions {
    show?: string;
    when?: any;
    eq?: any;
}
export interface ValidateOptions {
    required?: boolean;
    custom?: string;
    customPrivate?: boolean;
}
export interface ComponentOptions<T, V> {
    defaultValue?: T | Array<T>;
    type?: string;
    key?: string;
    label?: string;
    input?: boolean;
    required?: boolean;
    multiple?: boolean;
    protected?: boolean;
    unique?: boolean;
    persistent?: boolean;
    tableView?: boolean;
    lockKey?: boolean;
    validate?: V;
    conditional?: ConditionalOptions;
    customConditional?: string;
}
export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> {
}
/**
 * Create the custom validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
export declare function CustomValidator(custom: string, form: FormGroup): (control: FormControl) => {
    custom: false;
};
export declare class BaseComponent<T> {
    form: FormGroup;
    settings: any;
    data: any;
    control: FormControl | FormGroup | FormArray;
    index: number;
    private _label;
    protected validators: ValidatorFn[];
    constructor(form: FormGroup, settings: any, data?: any);
    getData(index?: number): any;
    setValue(value: any): void;
    label: string | boolean;
    readonly defaultValue: T;
    getControl(): FormArray | FormGroup | FormControl;
    getError(type: string, error: any): string;
    getFormioError(type: string, error: any): FormioError;
    readonly errors: Array<FormioError>;
    addValidators(): void;
    allowMultiple(): boolean;
}
export declare class BaseElement<T> implements OnInit {
    component: T;
    form: FormGroup;
    events: FormioEvents;
    render: EventEmitter<any>;
    private renderCount;
    readonly numComponents: number;
    ngOnInit(): void;
    onRender(): void;
}
