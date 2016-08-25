import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { DatePickerComponent } from '../../../node_modules/ng2-bootstrap/components/datepicker/datepicker.component';

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
    public dt: Date = new Date();
    public minDate: Date = void 0;
    public formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format: string = this.formats[0];
    public dateOptions: any = {
        formatYear: 'YY',
        startingDay: 1
    };
    public getDate():number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    }
    public today():void {
        this.dt = new Date();
    }
    public clear():void {
        this.dt = void 0;
    }
    ngOnInit(){
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    }
}

export function DateTime(template:FormioTemplate) {
    FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, {
        template: template.components.datetime,
        directives: [DatePickerComponent, TimepickerComponent, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
    });
    return DateTimeElement;
}
