import { Input, OnInit } from '@angular/core';
import { FormioComponents } from '../components';
import { InputComponent, InputOptions, InputElement } from '../input/input';
import { FormioTemplate } from '../../formio.template';
import { FormGroup } from '@angular/forms';

export interface NumberOptions extends InputOptions {

}

export class NumberComponent extends InputComponent {
    constructor(form: FormGroup , settings:any) {
        super(form,settings);
        settings.inputType = 'number';
    }
}

export class NumberElement extends InputElement implements OnInit {
    @Input() component: NumberComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function Number(template:FormioTemplate) {
    FormioComponents.register('number', NumberComponent, NumberElement, {
        template: template.components.input
    });
    return NumberElement;
};
