import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface PhoneNumberOptions extends BaseOptions<any> {
    inputMask?: string;
    placeholder?: string;
    customClass?: string;
    prefix?: string;
    suffix?: string;
}
export declare class PhoneNumberComponent extends BaseComponent<PhoneNumberOptions> {
}
export declare class PhoneNumberElement extends BaseElement<PhoneNumberComponent> implements OnInit {
    mask: Array<any>;
    unmask(val: any): any;
    ngOnInit(): void;
}
export declare function PhoneNumberField(template: FormioTemplate): typeof PhoneNumberElement;
