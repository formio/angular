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
    selectedDate: Date;
    showDateTime: any;
    checkDates: Date;
    displayDate: Boolean;
    displayTime: Boolean;
    minDate: Date;
    time: any;
    dateFormat: any;
    getDate(): Date;
    today(): void;
    clear(): void;
    close(): void;
    selectDate(): void;
    selectTime(date: any): void;
    selectFirstTime(): void;
    checkDate(): void;
    now(): void;
    ngOnInit(): void;
}
export declare function DateTimeField(template: FormioTemplate): typeof DateTimeElement;
