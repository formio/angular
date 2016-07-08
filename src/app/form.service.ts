import { Injectable, Type } from '@angular/core';
import { FormioForm } from './formio/formio.component';
@Injectable()
export class FormService extends Type {
    getForm() : FormioForm {
        return {
            title: 'Test Form',
            template: 'bootstrap',
            components: [{
                input: false,
                columns: [{
                    components: [{
                        input: true,
                        tableView: true,
                        inputType: 'text',
                        inputMask: '',
                        label: 'First Name',
                        key: 'firstName',
                        placeholder: 'Enter your first name',
                        prefix: '',
                        suffix: '',
                        multiple: false,
                        defaultValue: '',
                        protected: false,
                        unique: false,
                        persistent: true,
                        validate: {
                            required: false,
                            minLength: '',
                            maxLength: '',
                            pattern: '',
                            custom: '',
                            customPrivate: false
                        },
                        conditional: {
                            show: '',
                            when: null,
                            eq: ''
                        },
                        type: 'textfield'
                    }]
                }, {
                    components: [{
                        input: true,
                        tableView: true,
                        inputType: 'text',
                        inputMask: '',
                        label: 'Last Name',
                        key: 'lastName',
                        placeholder: 'Enter your last name',
                        prefix: '',
                        suffix: '',
                        multiple: false,
                        defaultValue: '',
                        protected: false,
                        unique: false,
                        persistent: true,
                        validate: {
                            required: false,
                            minLength: '',
                            maxLength: '',
                            pattern: '',
                            custom: '',
                            customPrivate: false
                        },
                        conditional: {
                            show: '',
                            when: null,
                            eq: ''
                        },
                        type: 'textfield'
                    }]
                }],
                type: 'columns',
                conditional: {
                    show: '',
                    when: null,
                    eq: ''
                }
            }, {
                input: true,
                label: 'Submit',
                tableView: false,
                key: 'submit',
                size: 'md',
                leftIcon: '',
                rightIcon: '',
                block: false,
                action: 'submit',
                disableOnInvalid: true,
                theme: 'primary',
                type: 'button'
            }]
        };
    }
}