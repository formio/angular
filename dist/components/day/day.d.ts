/// <reference types="chai" />
import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { FormGroup } from "@angular/forms";
export interface DayOptions extends BaseOptions<any> {
    placeholder?: string;
    dayFirst?: boolean;
    fields?: Object;
    customClass?: string;
}
export declare class DayComponent extends BaseComponent<DayOptions> {
}
export declare class DayElement extends BaseElement<DayComponent> implements OnInit {
    months: Array<any>;
    date: Object;
    dayForm: FormGroup;
    ngOnInit(): void;
    getDay(day: any): void;
    getMonth(month: any): void;
    getYear(year: any): void;
    updateModel(): void;
}
export declare function DayField(template: FormioTemplate): typeof DayElement;
