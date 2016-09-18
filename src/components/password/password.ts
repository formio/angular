import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';

export class PasswordComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any) {
        super('password', form, settings);
    }
}

export class PasswordElement extends BaseElement<PasswordComponent> {}
export function PasswordField(template:FormioTemplate) {
    FormioComponents.register('password', PasswordComponent, PasswordElement, template.components.input);
    return PasswordElement;
};
