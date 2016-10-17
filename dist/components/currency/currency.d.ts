import { BaseComponent, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
import { InputOptions } from '../input/input';
export declare class CurrencyComponent extends BaseComponent<InputOptions> {
}
export declare class CurrencyElement extends BaseElement<CurrencyComponent> {
    inputs: any;
    onChange(value: any): any;
}
export declare function CurrencyField(template: FormioTemplate): typeof CurrencyElement;
