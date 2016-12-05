import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { OnInit } from '@angular/core';
export interface ContentOptions extends BaseOptions<any> {
    html: string;
    customClass?: string;
}
export declare class ContentComponent extends BaseComponent<ContentOptions> {
}
export declare class ContentElement extends BaseElement<ContentComponent> implements OnInit {
    element: string;
    ngOnInit(): void;
}
export declare function ContentField(template: FormioTemplate): typeof ContentElement;
