import { OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { BaseComponent, ComponentOptions, ValidateOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

/**
 * The TextFieldValiation interface.
 */
export interface TextFieldValidateOptions extends ValidateOptions {
    minLength?: number | string;
    maxLength?: number | string;
    pattern?: string;
}

export interface TextFieldOptions extends ComponentOptions<string, TextFieldValidateOptions> {
    inputType?: string,
    tableView?: boolean,
    inputMask?: string,
    placeholder?: string,
    prefix?: string,
    suffix?: string
}

export function TextField(template:FormioTemplate) {
    class _TextField extends BaseComponent<TextFieldOptions> implements OnInit {
        constructor() {
            super();
        }
        ngOnInit() {
            this.component.inputType = 'text';
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
        getValidators() : ValidatorFn[] {
            if (!this.component.validate) {
                return [];
            }
            let validators = super.getValidators();
            if (this.component.validate.minLength) {
                //noinspection TypeScriptValidateTypes
                validators.push(Validators.minLength(parseInt(this.component.validate.minLength, 10)));
            }
            if (this.component.validate.maxLength) {
                //noinspection TypeScriptValidateTypes
                validators.push(Validators.maxLength(parseInt(this.component.validate.maxLength, 10)));
            }
            if (this.component.validate.pattern) {
                validators.push(Validators.pattern(this.component.validate.pattern));
            }
            return validators;
        }
    }
    FormioComponents.register('textfield', _TextField, {
        template: template.components.textfield
    });
    return _TextField;
};
