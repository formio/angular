import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface AddressOptions extends BaseOptions<string> {
    placeholder?: string;
    customClass?: string;
}
export declare class AddressComponent extends BaseComponent<AddressOptions> {
    allowMultiple(): boolean;
}
export declare class AddressElement extends BaseElement<AddressComponent> {
    private value;
    refreshValue(value: any): void;
    selectedItem: Array<any>;
    selectedData(value: any): void;
}
export declare function AddressField(template: FormioTemplate): typeof AddressElement;
