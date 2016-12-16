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
    public getDay(event: any) {}
    public getMonth(value: any) {}
    public getYear(event: any) {}
}

export function DayField(template:FormioTemplate) {
    FormioComponents.register('day', DayComponent, DayElement, template.components.day);
    return DayElement;
}
