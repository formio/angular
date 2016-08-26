import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/components/datepicker';

export interface DateTimeOptions extends BaseOptions<any> {
    showWeeks?: boolean,
    startingDay?: string,
    initDate?: string,
    minMode?: string,
    maxMode?: string,
    yearRange?: string,
    datepickerMode?: string
}

export class DateTimeComponent extends BaseComponent<DateTimeOptions> {

}

export class DateTimeElement extends BaseElement<DateTimeComponent> implements OnInit{
    public dt: Date = null;
    public displayDate: Boolean = false;
    public displayTime: Boolean = false;
    public showDate: Boolean = true;
    public minDate: Date = void 0;
    public mytime: any = 0;
    public dateFormat: any ;

    public getDate(): Date {
        return this.dt;
    }
    public today():void {
        this.dt = new Date();
    }
    public clear():void {
        this.dt = void 0;
        this.mytime = void 0;
    }
    public close(): void {
        this.displayDate = false;
        this.displayTime = false;
    }
    public selectDate():void {
        this.displayDate = true;
        this.displayTime = false;
    }
    public selectTime():void {
        this.showDate = false;
        this.displayTime = true;
        this.displayDate = false;
    }
    public now():void {
        this.mytime = new Date();
    }
    ngOnInit(){
        this.dateFormat = this.component.settings.format.split(' ')[0];
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    }
}

export function DateTime(template:FormioTemplate) {
    FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, {
        template: template.components.datetime,
        directives: [DATEPICKER_DIRECTIVES, TimepickerComponent, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
    });
    return DateTimeElement;
}
