import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface ContentOptions extends BaseOptions<any> {
    html: string;
}
export declare class ContentComponent extends BaseComponent<ContentOptions> {
}
export declare class ContentElement extends BaseElement<ContentComponent> {
}
export declare function ContentField(template: FormioTemplate): typeof ContentElement;
