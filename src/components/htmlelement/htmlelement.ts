import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface HtmlElementOptions extends BaseOptions<any> {
    tag: string,
    attrs: Array<{}>,
    className: string,
    content: string,
    attr?: string,
    value?: string,
    tags?:Array<string>
}

export class HtmlElementComponent extends BaseComponent<HtmlElementOptions> {
    
}

export class HtmlElementElement extends BaseElement<HtmlElementComponent> implements OnInit {
    public element: string;
    ngOnInit(){
        let attributes: string = '';
        this.component.settings.attrs.forEach((item: any) => {
            attributes = attributes + item.attr + "=" + item.value + " ";
        });
        this.element = "<" + this.component.settings.tag + " class='" + this.component.settings.className + "' "+ attributes +">" + this.component.settings.content + "</" + this.component.settings.tag + ">";
    }
}

export function HtmlElement(template:FormioTemplate) {
    FormioComponents.register('htmlelement', HtmlElementComponent, HtmlElementElement, {
        template: template.components.htmlelement
    });
    return HtmlElementElement;
}
