import { OnInit, Injectable } from '@angular/core';
import { BaseComponent } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

@Injectable()
class _TextField extends BaseComponent implements OnInit {
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
