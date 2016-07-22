import {
    describe,
    expect,
    it
} from '@angular/core/testing';

import { FormGroup, FormControl } from '@angular/forms';
import { TextFieldComponent, TextFieldOptions } from './textfield';

describe('TextFieldComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    it('Should not allow invalid TextField values.', () => {
        let settings: TextFieldOptions = {
            type: 'textfield',
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
                required: true,
                minLength: 2,
                maxLength: 10,
                pattern: '[a-zA-Z0-9\\s]+',
                custom: '',
                customPrivate: false
            },
            conditional: {
                show: '',
                when: null,
                eq: ''
            }
        };

        // Create the text field component.
        let textField = new TextFieldComponent(this.form, settings);
        expect(textField.settings).toEqual(settings);
        expect(textField.defaultValue).toEqual('');
        expect(textField.label).toEqual('First Name');
        expect(textField.control instanceof FormControl).toEqual(true);
        expect(textField.control.value).toEqual('');

        let updateValue = (val: string) => {
            // Have to do this to keep TypeScript from barking.
            textField.control['updateValue'](val);
        };

        updateValue('T');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({minlength: {requiredLength: 2, actualLength: 1}});
        expect(textField.getError('minlength', textField.control.errors['minlength'])).toEqual('First Name must be at least 2 characters');

        updateValue('');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({required: true});
        expect(textField.getError('required', textField.control.errors['required'])).toEqual('First Name is required');

        updateValue('Testing Testing');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({maxlength: {requiredLength: 10, actualLength: 15}});
        expect(textField.getError('maxlength', textField.control.errors['maxlength'])).toEqual('First Name cannot be more than 10 characters');

        updateValue('Test-');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({pattern: {requiredPattern: '^[a-zA-Z0-9\\s]+$', actualValue: 'Test-'}});
        expect(textField.getError('pattern', textField.control.errors['pattern'])).toEqual('First Name must match the pattern ^[a-zA-Z0-9\\s]+$');

        updateValue('Testing');
        expect(textField.control.valid).toEqual(true);
        expect(textField.control.errors).toEqual(null);
    });
});