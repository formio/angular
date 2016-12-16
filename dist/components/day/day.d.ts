/// <reference types="chai" />
import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface DayOptions extends BaseOptions<any> {
    placeholder?: string;
    dayFirst?: boolean;
}
export declare class DayComponent extends BaseComponent<DayOptions> {
}
export declare class DayElement extends BaseElement<DayComponent> implements OnInit {
    months: Array<any>;
    date: Object;
    ngOnInit(): void;
    getDay(event: any): void;
    getMonth(event: any): void;
    getYear(event: any): void;
}
export declare function DayField(template: FormioTemplate): typeof DayElement;
