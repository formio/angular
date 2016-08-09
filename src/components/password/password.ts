import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { InputComponent, InputElement, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';

export class PasswordComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any) {
        super('password', form, settings);
    }
}

export class PasswordElement extends InputElement<PasswordComponent> {}
export function PasswordField(template:FormioTemplate) {
    FormioComponents.register('password', PasswordComponent, PasswordElement, {
        template: template.components.input
    });
    return PasswordElement;
};
