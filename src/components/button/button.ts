import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

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
export class ButtonElement extends BaseElement<ButtonComponent> {
    public disabled: boolean = false;
    public submitting: boolean = false;
    ngOnInit() {
        super.ngOnInit();
        if (this.component.settings.action === 'submit') {
            this.component.events.beforeSubmit.subscribe(() => {
                this.disabled = this.submitting = true;
            });
            this.component.events.onSubmit.subscribe(() => {
                this.disabled = this.submitting = false;
            });
        }
    }
}
export function ButtonField(template: FormioTemplate) {
    FormioComponents.register('button', ButtonComponent, ButtonElement, template.components.button);
    return ButtonElement;
}
