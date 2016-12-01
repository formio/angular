import { FormGroup, FormControl } from '@angular/forms';
import { InputComponent, InputOptions } from '../input/input';
import { BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
/**
 * Create an email validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
export declare function EmailValidator(control: FormControl): {
    "invalidEmail": boolean;
};
export declare class EmailComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings: any, data?: any);
    getError(type: string, error: any): string;
    addValidators(): void;
}
export declare class EmailElement extends BaseElement<EmailComponent> {
}
export declare function EmailField(template: FormioTemplate): typeof EmailElement;
