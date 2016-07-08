import { OnInit, Injectable } from '@angular/core';
import { BaseComponent, ComponentOptions, ValidateOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

export interface TextFieldValidateOptions extends ValidateOptions {
    minLength?: string;
    maxLength?: string;
    pattern?: string;
}

export interface TextFieldOptions extends ComponentOptions<string, TextFieldValidateOptions> {
    inputType?: string,
    label?: string,
    tableView?: boolean,
    inputMask?: string,
    placeholder?: string,
    prefix?: string,
    suffix?: string
}

@Injectable()
class _TextField extends BaseComponent<TextFieldOptions> implements OnInit {
    constructor() {
        super();
    }
    ngOnInit() {
        this.component.inputType = 'text';
    }
}

export function TextField(template:FormioTemplate) {
    FormioComponents.register('textfield', _TextField, {
        selector: 'formio-textfield',
        template: template.components.textfield
    });
    return _TextField;
};
