import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { BaseComponent, BaseElement } from '../base';

export interface CustomOptions {}
export class CustomComponent extends BaseComponent<CustomOptions> {}
export class CustomElement extends BaseElement<CustomComponent> {}
export function CustomField(template:FormioTemplate) {
    FormioComponents.register('custom', CustomComponent, CustomElement, template.components.custom);
    return CustomElement;
};
