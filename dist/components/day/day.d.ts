/// <reference types="chai" />
import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { FormGroup, FormControl } from "@angular/forms";
export interface DayOptions extends BaseOptions<any> {
    placeholder?: string;
    dayFirst?: boolean;
    fields?: Object;
    customClass?: string;
    tags?: Array<string>;
    tabindex?: string;
}
export declare function DayValidator(component: DayComponent): (control: FormControl) => any;
export declare class DayComponent extends BaseComponent<DayOptions> {
    getError(type: string, error: any): string;
    addValidators(): void;
}
export declare class DayElement extends BaseElement<DayComponent> implements OnInit {
    months: Array<any>;
    date: Object;
    dayGroup: FormGroup;
    ngOnInit(): void;
    getDay(day: any): void;
    getMonth(month: any): void;
    getYear(year: any): void;
    updateModel(): void;
}
export declare function DayField(template: FormioTemplate): typeof DayElement;
