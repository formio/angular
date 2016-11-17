import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface PhoneNumberOptions extends BaseOptions<any> {
    inputMask?: string;
    placeholder?: string;
    customClass?: string;
    prefix?: string;
    suffix?: string;
}

export class PhoneNumberComponent extends BaseComponent<PhoneNumberOptions> {}
export class PhoneNumberElement extends BaseElement<PhoneNumberComponent> implements OnInit {
    public mask: Array<any>;
    public unmask(val: any): any {
        return val.replace(/\D+/g, '');
    }
    ngOnInit() {
        this.mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.mask[0] = this.component.settings.inputMask.split('')[0];
        this.mask[4] = this.component.settings.inputMask.split('')[4];
        this.mask[9] = this.component.settings.inputMask.split('')[9];
    }
}

export function PhoneNumberField(template:FormioTemplate) {
    FormioComponents.register('phoneNumber', PhoneNumberComponent, PhoneNumberElement, template.components.phoneNumber);
    return PhoneNumberElement;
}
