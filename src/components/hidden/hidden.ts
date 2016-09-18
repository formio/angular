import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface HiddenOptions extends BaseOptions<string> {}
export class HiddenComponent extends BaseComponent<HiddenOptions> {}
export class HiddenElement extends BaseElement<HiddenComponent> {}
export function HiddenField(template:FormioTemplate) {
    FormioComponents.register('hidden', HiddenComponent, HiddenElement, template.components.hidden);
    return HiddenElement;
};
