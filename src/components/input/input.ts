import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent, ComponentOptions, ValidateOptions } from '../base';

/**
 * The InputValidation interface.
 */

export interface InputValidateOptions extends ValidateOptions {
    minLength?: number | string;
    maxLength?: number | string;
    pattern?: string;
}

export interface InputOptions extends ComponentOptions<string, InputValidateOptions> {
    inputType?: string,
    inputMask?: string,
    placeholder?: string,
    prefix?: string,
    suffix?: string,
    tabindex?: number | string
}

export class InputComponent<T> extends BaseComponent<T> {
    constructor(inputType: string, form: FormGroup, settings:any, data?: any) {
        settings.inputType = inputType;
        super(form, settings, data);
    }
    getError(type: string, error: any) : string {
        let message = super.getError(type, error);
        if (!message) {
            switch (type) {
                case 'minlength':
                    message = this.label + ' must be at least ' + error.requiredLength + ' characters';
                    break;
                case 'maxlength':
                    message = this.label + ' cannot be more than ' + error.requiredLength + ' characters';
                    break;
                case 'pattern':
                    message = this.label + ' must match the pattern ' + error.requiredPattern;
                    break;
            }
        }
        return message;
    }
    addValidators() {
        super.addValidators();
        if (!this.settings.validate) {
            return;
        }
        if (this.settings.validate.minLength) {
            //noinspection TypeScriptValidateTypes
            this.validators.push(Validators.minLength(parseInt(this.settings.validate.minLength, 10)));
        }
        if (this.settings.validate.maxLength) {
            //noinspection TypeScriptValidateTypes
            this.validators.push(Validators.maxLength(parseInt(this.settings.validate.maxLength, 10)));
        }
        if (this.settings.validate.pattern) {
            this.validators.push(Validators.pattern(this.settings.validate.pattern));
        }
    }
}
