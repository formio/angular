import { FormioTemplate } from '../../formio.template';
import { BaseComponent, BaseElement } from '../base';
export interface CustomOptions {
}
export declare class CustomComponent extends BaseComponent<CustomOptions> {
}
export declare class CustomElement extends BaseElement<CustomComponent> {
}
export declare function CustomField(template: FormioTemplate): typeof CustomElement;
