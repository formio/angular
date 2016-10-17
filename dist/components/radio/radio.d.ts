import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface RadioOptions extends BaseOptions<string> {
    inputType?: string;
    type?: string;
    inline?: boolean;
    value?: string;
    values?: Array<{}>;
    defaultValue?: string;
}
export declare class RadioComponent extends BaseComponent<RadioOptions> {
}
export declare class RadioElement extends BaseElement<RadioComponent> {
}
export declare function RadioField(template: FormioTemplate): typeof RadioElement;
