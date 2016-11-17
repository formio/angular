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

export class DateTimeComponent extends BaseComponent<DateTimeOptions> {

}

export class DateTimeElement extends BaseElement<DateTimeComponent> implements OnInit {
    public selectedDate: Date = null;
    public showDateTime:any;
    public checkDates: Date = null;
    public displayDate: Boolean = false;
    public displayTime: Boolean = false;
    public minDate: Date = void 0;
    public time: any = void 0;
    public dateFormat: any;
    public getDate(): Date {
        return this.selectedDate;
    }
    public today():void {
        this.showDateTime =true;
        this.selectedDate = new Date();
        if(this.component.settings.enableTime) {
            if (!this.time) {
                this.time = new Date().setHours(0, 0, 0, 0);
            }
        }
    }
    public clear():void {
        this.showDateTime =false;
        this.selectedDate = void 0;
        this.time = void 0;
    }
    public close(): void {
        this.displayDate = false;
        this.displayTime = false;
    }
    public selectDate():void {
        if((!this.component.settings.enableTime && this.component.settings.enableDate) || (this.component.settings.enableTime && this.component.settings.enableDate) ){
            this.displayDate = true;
            this.displayTime = false;
        }else if(this.component.settings.enableTime && !this.component.settings.enableDate){
            this.displayDate = false;
            this.displayTime = true;   
        }
    }
    public selectTime(date: any):void {
        if(this.component.settings.enableTime){
            if(date!= this.checkDates){
                this.checkDates = date;
                this.displayTime = true;
                this.displayDate = false;
            }
            if(!this.time){
                this.time = new Date().setHours(0,0,0,0);
            }
        }
        if(date instanceof Date){
            this.showDateTime =true;
        }
    }
    public selectFirstTime(): void {
        this.displayTime = true;
        this.displayDate = false;
        this.checkDate();
        if(!this.time){
            this.showDateTime =false;
        }
    }
    public checkDate() {
        this.showDateTime =true;
        if(this.component.settings.enableDate){
            if(!this.selectedDate){
                this.selectedDate = new Date();
            }
         }
    }
    public now():void {
        this.checkDate();
        this.time = new Date();
    }
    ngOnInit() {
        this.dateFormat = this.component.settings.format.split(' ')[0];
    }
}

export function DateTimeField(template:FormioTemplate) {
    FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, template.components.datetime);
    return DateTimeElement;
}
