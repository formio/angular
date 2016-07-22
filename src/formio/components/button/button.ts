import { Input } from '@angular/core';
import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio';

export interface ButtonOptions extends BaseOptions<boolean> {
    size: string,
    leftIcon: string,
    rightIcon: string,
    block: boolean,
    action: string,
    disableOnInvalid: boolean,
    theme: string
}
export class ButtonComponent extends BaseComponent<ButtonOptions> {}
export class ButtonElement extends BaseElement {
    @Input() component: ButtonComponent;
}
export function Button(template: FormioTemplate) {
    FormioComponents.register('button', ButtonComponent, ButtonElement, {
        template: template.components.button
    });
    return ButtonElement;
}
