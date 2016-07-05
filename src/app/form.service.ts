import { Injectable, Type }       from '@angular/core';
import { ComponentOptions }     from './formio/formio-component.component';
@Injectable()
export class FormService extends Type {
    getForm() {
        let components: Array<ComponentOptions<any>> = [
            {
                type: 'textfield',
                key: 'firstName',
                label: 'First name',
                required: true
            },
            {
                type: 'textfield',
                key: 'lastName',
                label: 'Last name',
                required: true
            },
        ];
        return components;
    }
}