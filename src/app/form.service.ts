import { Injectable, Type } from '@angular/core';
import { FormioForm } from './formio/formio.component';
@Injectable()
export class FormService extends Type {
    getForm() : FormioForm {
        return {
            title: 'Test Form',
            template: 'bootstrap',
            components: [
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
                {
                    type: 'button',
                    label: 'Submit',
                    key: 'submit',
                    theme: 'primary',
                    required: false
                }
            ]
        };
    }
}