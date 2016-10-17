import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface HtmlOptions extends BaseOptions<any> {
    tag: string;
    attrs: Array<{}>;
    className: string;
    content: string;
    attr?: string;
    value?: string;
    tags?: Array<string>;
}
export declare class HtmlComponent extends BaseComponent<HtmlOptions> {
}
export declare class HtmlElement extends BaseElement<HtmlComponent> implements OnInit {
    element: string;
    ngOnInit(): void;
}
export declare function HtmlField(template: FormioTemplate): typeof HtmlElement;
