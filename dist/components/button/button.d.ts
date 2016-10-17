import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface ButtonOptions extends BaseOptions<boolean> {
    size: string;
    leftIcon: string;
    rightIcon: string;
    block: boolean;
    action: string;
    disableOnInvalid: boolean;
    theme: string;
}
export declare class ButtonComponent extends BaseComponent<ButtonOptions> {
}
export declare class ButtonElement extends BaseElement<ButtonComponent> {
}
export declare function ButtonField(template: FormioTemplate): typeof ButtonElement;
