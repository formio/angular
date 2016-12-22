import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { FormGroup, FormControl } from "@angular/forms";

export interface DayOptions extends BaseOptions<any> {
    placeholder?: string,
    dayFirst?: boolean
}

export class DayComponent extends BaseComponent<DayOptions> {}
export class DayElement extends BaseElement<DayComponent> implements OnInit {
    public months: Array<any> = [];
    public date: Object = { day: '', month: '', year: '' };
    public dayForm = new FormGroup({
        day: new FormControl(),
        month: new FormControl(),
        year: new FormControl()
    });
    ngOnInit() {
        this.months = [this.component.settings.fields.month.placeholder, 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
    }
    public getDay(day: any) {
        if (isNaN(day)) {
            day = '';
        }
        if (day.length > 2) {
            day = day.substring(0, 2);
        }
        if (parseInt(day) < 1 || parseInt(day) > 31) {
            day = day.substring(0, 1);
        }
        this.date['day'] = day;
        this.updateModel();
    }
    public getMonth(month: any) {
        this.date['month'] = month;
        this.updateModel();
    }
    public getYear(year: any) {
        if (isNaN(year)) {
            year = '';
        }
        if (year.length > 4) {
            year = year.substring(0, 4);
        }
        if (parseInt(year) < 0 || parseInt(year) > 2100) {
            year = year.substring(0, 3);
        }
        this.date['year'] = year;
        this.updateModel();
    }
    public updateModel() {
        let day: string = this.date['day'];
        let month: string = this.date['month'];
        let year: string = this.date['year'];
        if (day == '') {
            day = '00';
        } else if (day.length < 2) {
            day = '0' + day;
        }
        if (month == '') {
            month = '00';
        } else if (month.length < 2) {
            month = '0' + month;
        }
        if (year == '') {
            year = '0000';
        } else if (year.length == 3) {
            year = '0' + year;
        } else if (year.length == 2) {
            year = '00' + year;
        } else if (year.length == 1) {
            year = '000' + year;
        }
        this.component.setValue(day + '/' + month + '/' + year);
    }
}

export function DayField(template:FormioTemplate) {
    FormioComponents.register('day', DayComponent, DayElement, template.components.day);
    return DayElement;
}
