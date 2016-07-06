import { Injectable } from '@angular/core';
import { BaseComponent } from '../base';
import { FormioComponents } from '../components';

@Injectable()
export class ButtonField extends BaseComponent {
    constructor() {
        super();
    }
}

FormioComponents.register('button', ButtonField, {
    selector: 'formio-button',
    template: require('./button.html')
});
