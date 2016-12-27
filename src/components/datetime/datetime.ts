import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface DateTimeOptions extends BaseOptions<any> {
    placeholder?: string,
    format?: string,
    enableDate?: boolean,
    enableTime?: boolean,
    datepickerMode?: string,
    showWeeks?: boolean,
    startingDay?: string,
    initDate?: string,
    minMode?: string,
    maxMode?: string,
    yearRange?: string,
    hourStep?: number,
    minuteStep?: number,
    showMeridian?: boolean,
    readonlyInput?: boolean,
    mousewheel?: boolean,
    arrowkeys?: boolean,
    minDate?: string,
    maxDate?: string
}

export class DateTimeComponent extends BaseComponent<DateTimeOptions> {}
export class DateTimeElement extends BaseElement<DateTimeComponent> implements OnInit {
    public selectedDate: Date = null;
    public showDateTime: any;
    public checkDates: Date = null;
    public displayDate: Boolean = false;
    public displayTime: Boolean = false;
    public minDate: Date = void 0;
    public time: any = void 0;
    public dateFormat: any;
    public getDate(): Date {
        return this.selectedDate;
    }
    public today() {
        this.showDateTime = true;
        this.selectedDate = new Date();
        if (this.component.settings.enableTime) {
            if (!this.time) {
                this.time = new Date().setHours(0, 0, 0, 0);
                this.selectedDate.setHours(0, 0, 0, 0);
            }
        }
        this.component.setValue(this.selectedDate.toISOString());
    }
    public clear() {
        this.showDateTime = false;
        this.selectedDate = void 0;
        this.time = void 0;
        this.component.setValue(null);
    }
    public close() {
        this.displayDate = false;
        this.displayTime = false;
    }
    public selectDate() {
        if ((!this.component.settings.enableTime && this.component.settings.enableDate) ||
            (this.component.settings.enableTime && this.component.settings.enableDate)
        ) {
            this.displayDate = true;
            this.displayTime = false;
        } else if (this.component.settings.enableTime && !this.component.settings.enableDate) {
            this.displayDate = false;
            this.displayTime = true;
        }
    }
    public selectTime(date: any) {
        if (this.component.settings.enableTime) {
            if (date != this.checkDates) {
                this.checkDates = date;
                this.displayTime = true;
                this.displayDate = false;
            }
            if (!this.time) {
                this.time = new Date().setHours(0,0,0,0);
            }
        }
        if (date instanceof Date) {
            this.showDateTime = true;
        }
        this.submitDate();
    }
    public selectFirstTime() {
        this.displayTime = true;
        this.displayDate = false;
        this.checkDate();
        if (!this.time) {
            this.showDateTime = false;
        }
        this.submitDate();
    }
    public checkDate() {
        this.showDateTime = true;
        if (this.component.settings.enableDate) {
            if (!this.selectedDate) {
                this.selectedDate = new Date();
            }
        }
    }
    public submitDate() {
        var finalDate;
        if (this.selectedDate) {
            var year = this.selectedDate.getFullYear();
            var month = this.selectedDate.getMonth();
            var day = this.selectedDate.getDate();
            finalDate = new Date(year, month, day);
        }
        if (this.time instanceof Date) {
            var hours = this.time.getHours();
            var minutes = this.time.getMinutes();
            var seconds = this.time.getSeconds();
            var milliseconds = this.time.getMilliseconds();
            finalDate = new Date(year, month, day, hours, minutes, seconds, milliseconds);
        }
        this.component.setValue(finalDate.toISOString());
    }
    public now() {
        this.checkDate();
        this.time = new Date();
        this.component.setValue(this.selectedDate.toISOString());
    }
    ngOnInit() {
        this.dateFormat = this.component.settings.format.split(' ')[0];
    }
}

export function DateTimeField(template:FormioTemplate) {
    FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, template.components.datetime);
    return DateTimeElement;
}
