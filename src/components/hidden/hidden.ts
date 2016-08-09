import { OnInit } from '@angular/core';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface HiddenOptions extends BaseOptions<string> {}
export class HiddenComponent extends BaseComponent<HiddenOptions> {}
export class HiddenElement extends BaseElement<HiddenComponent> implements OnInit {
    ngOnInit() {
        this.onRender();
    }
}
export function HiddenField(template:FormioTemplate) {
    FormioComponents.register('hidden', HiddenComponent, HiddenElement, {
        template: template.components.hidden
    });
    return HiddenElement;
};
