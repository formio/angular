import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';
export declare class PasswordComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings: any, data?: any);
}
export declare class PasswordElement extends BaseElement<PasswordComponent> {
}
export declare function PasswordField(template: FormioTemplate): typeof PasswordElement;
