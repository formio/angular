import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface SelectBoxOptions extends BaseOptions<string> {
    inputType?: string,
    type?: string,
    inline?: boolean,
    value?: string,
    values?: Array<{}>,
    customClass?:string
}

export class SelectBoxComponent extends BaseComponent<SelectBoxOptions> {}
export class SelectBoxElement extends BaseElement<SelectBoxComponent> {
    public selected: Array<string> = [];
}

export function SelectBoxField(template:FormioTemplate) {
    FormioComponents.register('selectboxes', SelectBoxComponent, SelectBoxElement, template.components.selectboxes);
    return SelectBoxElement;
}
