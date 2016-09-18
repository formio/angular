import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface CheckBoxOptions extends BaseOptions<boolean> {
    hideLabel?: boolean
}

export class CheckBoxComponent extends BaseComponent<CheckBoxOptions> {}
export class CheckBoxElement extends BaseElement<CheckBoxComponent> {}
export function CheckBoxField(template:FormioTemplate) {
    FormioComponents.register('checkbox', CheckBoxComponent, CheckBoxElement, template.components.checkbox);
    return CheckBoxElement;
}
