import { Input, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { BaseComponent, BaseElement, ComponentOptions, ValidateOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

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
    inputMask?: string,
    placeholder?: string,
    prefix?: string,
    suffix?: string
}

export class TextFieldComponent extends BaseComponent<TextFieldOptions> {
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
        if (!this.settings.validate) {
            return [];
        }
        let validators = super.getValidators();
        if (this.settings.validate.minLength) {
            //noinspection TypeScriptValidateTypes
            validators.push(Validators.minLength(parseInt(this.settings.validate.minLength, 10)));
        }
        if (this.settings.validate.maxLength) {
            //noinspection TypeScriptValidateTypes
            validators.push(Validators.maxLength(parseInt(this.settings.validate.maxLength, 10)));
        }
        if (this.settings.validate.pattern) {
            validators.push(Validators.pattern(this.settings.validate.pattern));
        }
        return validators;
    }
}

export class TextElement extends BaseElement implements OnInit {
    @Input() component: TextFieldComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function TextField(template:FormioTemplate) {
    FormioComponents.register('textfield', TextFieldComponent, TextElement, {
        template: template.components.textfield
    });
    return TextElement;
};
