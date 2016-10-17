import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface CheckBoxOptions extends BaseOptions<boolean> {
    hideLabel?: boolean;
}
export declare class CheckBoxComponent extends BaseComponent<CheckBoxOptions> {
}
export declare class CheckBoxElement extends BaseElement<CheckBoxComponent> {
}
export declare function CheckBoxField(template: FormioTemplate): typeof CheckBoxElement;
