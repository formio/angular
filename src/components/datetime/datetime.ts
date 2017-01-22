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
    public date: Date;
    public displayDate: boolean = false;
    public displayTime: boolean = false;
    selectDate() {
        this.displayDate = true;
        this.displayTime = false;
    }

    registerTime(timepicker: any) {
        timepicker.selected = this.date;
        timepicker.registerOnChange((time: Date) => {
            this.date.setHours(time.getHours());
            this.date.setMinutes(time.getMinutes());
            this.setDate(this.date);
        });
        return true;
    }

    selectTime() {
        this.displayDate = false;
        this.displayTime = true;
    }

    setDate(date: Date) {
        this.date = date;
        this.component.control.setValue(date);
    }

    now() {
        this.setDate(new Date());
    }

    clear() {
        this.setDate(null);
    }

    close() {
        this.displayDate = false;
        this.displayTime = false;
    }

    ngOnInit() {
        super.ngOnInit();
        this.setDate(new Date());
    }
}

export function DateTimeField(template:FormioTemplate) {
    FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, template.components.datetime);
    return DateTimeElement;
}
