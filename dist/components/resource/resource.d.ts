import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface ResourceOptions extends BaseOptions<any> {
    placeholder?: string;
    template: string;
    resource: string;
    searchFields?: Array<string> | string;
    selectFields?: Array<string> | string;
}
export declare class ResourceComponent extends BaseComponent<ResourceOptions> {
    allowMultiple(): boolean;
}
export declare class ResourceElement extends BaseElement<ResourceComponent> implements OnInit {
    private value;
    refreshValue(value: any): void;
    submitArray: Array<any>;
    selected(selectedValue: any): void;
    removed(removedValue: any): void;
    searchData(text: any): void;
    ngOnInit(): void;
}
export declare function ResourceField(template: FormioTemplate): typeof ResourceElement;
