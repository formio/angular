import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface HiddenOptions extends BaseOptions<string> {
}
export declare class HiddenComponent extends BaseComponent<HiddenOptions> {
}
export declare class HiddenElement extends BaseElement<HiddenComponent> {
}
export declare function HiddenField(template: FormioTemplate): typeof HiddenElement;
