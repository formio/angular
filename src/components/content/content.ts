import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { OnInit } from '@angular/core';

export interface ContentOptions extends BaseOptions<any> {
    html: string,
    customClass?: string
}

export class ContentComponent extends BaseComponent<ContentOptions> {}
export class ContentElement extends BaseElement<ContentComponent> implements OnInit {
    public element: string;
    ngOnInit() {
        if (this.component.data[this.component.settings.key] != null) {
            this.element = this.component.data[this.component.settings.key];
        }
        else {
            this.element = this.component.settings.html;
        }
    }
}
export function ContentField(template:FormioTemplate) {
    FormioComponents.register('content', ContentComponent, ContentElement, template.components.content);
    return ContentElement;
}
