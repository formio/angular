import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface SelectOptions extends BaseOptions<any> {
    placeholder?: string;
    data: {};
    dataSrc: string;
    valueProperty?: string;
    template: string;
    refreshOn?: string;
    filter?: any;
    authenticate?: boolean;
    searchField?: string;
}
export declare class SelectComponent extends BaseComponent<SelectOptions> {
    allowMultiple(): boolean;
}
export declare class SelectElement extends BaseElement<SelectComponent> implements OnInit {
    private value;
    refreshValue(value: any): void;
    submitArray: Array<any>;
    selected(selectedValue: any): void;
    removed(removedValue: any): void;
    ngOnInit(): void;
}
export declare function SelectField(template: FormioTemplate): typeof SelectElement;
