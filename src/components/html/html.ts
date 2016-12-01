import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface HtmlOptions extends BaseOptions<any> {
    tag: string,
    attrs: Array<{}>,
    className: string,
    content: string,
    attr?: string,
    value?: string,
    tags?:Array<string>
}

export class HtmlComponent extends BaseComponent<HtmlOptions> {}
export class HtmlElement extends BaseElement<HtmlComponent> implements OnInit {
    public element: string;
    ngOnInit() {
        if (this.component.data[this.component.settings.key] != null) {
            this.element = this.component.data[this.component.settings.key];
        }
        else {
            let attributes: string = '';
            this.component.settings.attrs.forEach((item: any) => {
                attributes = attributes + item.attr + "=" + item.value + " ";
            });
            this.element = "<" + this.component.settings.tag + " class='" + this.component.settings.className + "' " + attributes + ">" + this.component.settings.content + "</" + this.component.settings.tag + ">";
        }
    }
}

export function HtmlField(template:FormioTemplate) {
    FormioComponents.register('htmlelement', HtmlComponent, HtmlElement, template.components.html);
    return HtmlElement;
}
