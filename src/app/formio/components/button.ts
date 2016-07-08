import { Injectable } from '@angular/core';
import { BaseComponent, BaseOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

@Injectable()
class _Button extends BaseComponent<BaseOptions<boolean>> {
    constructor() {
        super();
    }
}

export function Button(template: FormioTemplate) {
    FormioComponents.register('button', _Button, {
        selector: 'formio-button',
        template: template.components.button
    });
    return _Button;
}
