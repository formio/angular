import { FormioComponents } from '../components';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormioTemplate } from '../../formio.template';
import { FormGroup, FormControl } from '@angular/forms';

export function NumberValidator(component: NumberComponent) {
    return function(control: FormControl): any {
        if (control.value && control.value < component.settings.validate.min) {
            return {'minValue': true};
        } else if (control.value && control.value > component.settings.validate.max) {
            return {'maxValue': true};
        }
        return null;
    };
}

export class NumberComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any, data?: any) {
        super('number', form, settings, data);
    }
    getError(type: string, error: any) : string {
        let message = super.getError(type, error);
        if (!message && (type === 'minValue')) {
            message = this.label + ' should not be smaller than ' + this.settings.validate.min;
        }
        else if (!message && (type === 'maxValue')) {
            message = this.label + ' should not be greater than ' + this.settings.validate.max;
        }
        return message;
    }
    addValidators() {
        super.addValidators();
        this.validators.push(NumberValidator(this));
    }
}

export class NumberElement extends BaseElement<NumberComponent> {}
export function NumberField(template:FormioTemplate) {
    FormioComponents.register('number', NumberComponent, NumberElement, template.components.number);
    return NumberElement;
}
