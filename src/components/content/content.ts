import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface ContentOptions extends BaseOptions<any> {
    html: string
}

export class ContentComponent extends BaseComponent<ContentOptions> {}
export class ContentElement extends BaseElement<ContentComponent> {}
export function ContentField(template:FormioTemplate) {
    FormioComponents.register('content', ContentComponent, ContentElement, template.components.content);
    return ContentElement;
}
