import { Injectable, Type }       from '@angular/core';
import { ComponentBase }     from './formio/components/base';
import { Select } from './formio/components/select/select';
import { TextField }  from './formio/components/textfield/textfield';
@Injectable()
export class FormService extends Type {
    getForm() {
        let components: ComponentBase<any>[] = [
            new Select({
                key: 'brave',
                label: 'Bravery Rating',
                options: [
                    {key: 'solid',  value: 'Solid'},
                    {key: 'great',  value: 'Great'},
                    {key: 'good',   value: 'Good'},
                    {key: 'unproven', value: 'Unproven'}
                ]
            }),
            new TextField({
                key: 'firstName',
                label: 'First name',
                value: 'Travis',
                required: true
            }),
            new TextField({
                key: 'lastName',
                label: 'Last name',
                value: 'Tidwell',
                required: true
            }),
        ];
        return components;
    }
}