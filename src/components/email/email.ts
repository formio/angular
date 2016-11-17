import { FormGroup, FormControl } from '@angular/forms';
import { FormioComponents } from '../components';
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

export class EmailComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any, data?: any) {
        super('email', form, settings, data);
    }
    getError(type: string, error: any) : string {
        let message = super.getError(type, error);
        if (!message && (type === 'invalidEmail')) {
            message = this.label + ' is an invalid email.';
        }
        return message;
    }
    addValidators() {
        super.addValidators();
        this.validators.push(EmailValidator);
    }
}

export class EmailElement extends BaseElement<EmailComponent> {}
export function EmailField(template:FormioTemplate) {
    FormioComponents.register('email', EmailComponent, EmailElement, template.components.input);
    return EmailElement;
};
