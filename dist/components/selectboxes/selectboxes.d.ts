import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface SelectBoxOptions extends BaseOptions<string> {
    inputType?: string;
    type?: string;
    inline?: boolean;
    value?: string;
    values?: Array<{}>;
    customClass?: string;
}
export declare class SelectBoxComponent extends BaseComponent<SelectBoxOptions> {
}
export declare class SelectBoxElement extends BaseElement<SelectBoxComponent> {
    selected: Array<string>;
}
export declare function SelectBoxField(template: FormioTemplate): typeof SelectBoxElement;
