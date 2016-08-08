import { Input, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { FormioComponents } from '../components';
import { TextFieldComponent, TextElement } from '../textfield/textfield';
import { FormioTemplate } from '../../formio.template';

/**
 * Create an email validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
export function EmailValidator(control: FormControl) {
    /**
     *  RFC 5322 compliant emails only:
     *   - http://emailregex.com
     **/
    var EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (control.value && !EMAIL_REGEXP.test(control.value)) {
        return {"invalidEmail": true};
    }

    return null;
}

export class EmailComponent extends TextFieldComponent {
    getError(type: string, error: any) : string {
        let message = super.getError(type, error);
        if (!message && (type === 'invalidEmail')) {
            message = this.label + ' is an invalid email.';
        }
        return message;
    }
    getValidators() : ValidatorFn[] {
        let validators = super.getValidators();
        validators.push(EmailValidator);
        return validators;
    }
}

export class EmailElement extends TextElement implements OnInit {
    @Input() component: EmailComponent;
    ngOnInit() {
        this.component.settings.inputType = 'email';
        super.ngOnInit();
    }
}

export function EmailField(template:FormioTemplate) {
    FormioComponents.register('email', EmailComponent, EmailElement, {
        template: template.components.textfield
    });
    return EmailElement;
};
