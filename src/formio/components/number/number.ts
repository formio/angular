import { Input, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { BaseComponent, BaseElement, ComponentOptions, ValidateOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

/**
 * The NumberValiation interface.
 */

//@TODO: NumberValidator needs to be updated
export function NumberValidator(control: FormControl) {
    if (control.value && isNaN(control.value)){
        return {"invalidNumber": true};
    }
    return null;
}

export interface NumberValidateOptions extends ValidateOptions {
    minLength?: number | string;
    maxLength?: number | string;
}

export interface NumberOptions extends ComponentOptions<string, NumberValidateOptions> {
    inputType?: number,
    inputMask?: string,
    placeholder?: string,
    prefix?: string,
    suffix?: string
}

export class NumberComponent extends BaseComponent<NumberOptions> {
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
                case 'invalidNumber':
                    message = this.label + ' must be a number.';
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
        validators.push(NumberValidator);
        if (this.settings.validate.minLength) {
            //noinspection TypeScriptValidateTypes
            validators.push(Validators.minLength(parseInt(this.settings.validate.minLength, 10)));
        }
        if (this.settings.validate.maxLength) {
            //noinspection TypeScriptValidateTypes
            validators.push(Validators.maxLength(parseInt(this.settings.validate.maxLength, 10)));
        }
        return validators;
    }
}

export class NumberElement extends BaseElement implements OnInit {
    @Input() component: NumberComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function Number(template:FormioTemplate) {
    FormioComponents.register('number', NumberComponent, NumberElement, {
        template: template.components.textfield
    });
    return NumberElement;
};
