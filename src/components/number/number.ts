import { OnInit } from '@angular/core';
import { FormioComponents } from '../components';
import { InputComponent, InputElement, InputOptions } from '../input/input';
import { FormioTemplate } from '../../formio.template';
import { FormGroup } from '@angular/forms';

export class NumberComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any) {
        super('number', form, settings);
    }
}

export class NumberElement extends InputElement<NumberComponent> implements OnInit {
    ngOnInit() {
        this.onRender();
    }
}
export function NumberField(template:FormioTemplate) {
    FormioComponents.register('number', NumberComponent, NumberElement, {
        template: template.components.input
    });
    return NumberElement;
};
