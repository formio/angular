import { Input } from '@angular/core';
import { BaseComponent, BaseOptions, BaseElement } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

export class ButtonComponent extends BaseComponent<BaseOptions<boolean>> {}
export class ButtonElement extends BaseElement {
    @Input() component: ButtonComponent;
}
export function Button(template: FormioTemplate) {
    FormioComponents.register('button', ButtonComponent, ButtonElement, {
        template: template.components.button
    });
    return ButtonElement;
}
