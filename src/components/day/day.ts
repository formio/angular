import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface DayOptions extends BaseOptions<any> {
    placeholder?: string,
    dayFirst?: boolean
}

export class DayComponent extends BaseComponent<DayOptions> {}
export class DayElement extends BaseElement<DayComponent> implements OnInit {
    public months: Array<any> = [];
    public date: Object = { day: '', month: '', year: '' };
    ngOnInit() {
        this.months = [this.component.settings.fields.month.placeholder, 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
    }
    public getDay(day: any) {
        if (isNaN(day)) {
            day = '';
        }
        if (parseInt(day) < 1 || parseInt(day) > 31) {
            day = day.substring(0, 2);
        }
        this.date['day'] = day;
    }
    public getMonth(month: any) {
        this.date['month'] = month;
    }
    public getYear(year: any) {
        if (isNaN(year)) {
            year = '';
        }
        if (parseInt(year) < 0 || parseInt(year) > 2100) {
            year = year.substring(0, 4);
        }
        this.date['year'] = year;
    }
}

export function DayField(template:FormioTemplate) {
    FormioComponents.register('day', DayComponent, DayElement, template.components.day);
    return DayElement;
}
