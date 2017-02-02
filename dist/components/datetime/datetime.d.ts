import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface DateTimeOptions extends BaseOptions<any> {
    placeholder?: string;
    format?: string;
    enableDate?: boolean;
    enableTime?: boolean;
    datepickerMode?: string;
    showWeeks?: boolean;
    startingDay?: string;
    initDate?: string;
    minMode?: string;
    maxMode?: string;
    yearRange?: string;
    hourStep?: number;
    minuteStep?: number;
    showMeridian?: boolean;
    readonlyInput?: boolean;
    mousewheel?: boolean;
    arrowkeys?: boolean;
    minDate?: string;
    maxDate?: string;
}
export declare class DateTimeComponent extends BaseComponent<DateTimeOptions> {
}
export declare class DateTimeElement extends BaseElement<DateTimeComponent> implements OnInit {
    date: Date;
    displayDate: boolean;
    displayTime: boolean;
    selectDate(): void;
    registerTime(timepicker: any): boolean;
    selectTime(): void;
    setDate(date: Date): void;
    now(): void;
    clear(): void;
    close(): void;
    ngOnInit(): void;
}
export declare function DateTimeField(template: FormioTemplate): typeof DateTimeElement;
