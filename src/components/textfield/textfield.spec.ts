/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup, FormControl } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { InputOptions } from '../input/input';
import { TextFieldComponent } from './textfield';
import { FormioComponentComponent } from '../../formio-component.component';
import { INPUT } from '../../fixtures/fields/input';

describe('TextFieldComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new text field settings.
    var getSettings = (overrides: {}): InputOptions => {
        let settings: InputOptions = INPUT('textfield', 'text', 'firstName', 'First Name');
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:InputOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    }

    it('Should not allow invalid TextField values.', () => {
        let settings: InputOptions = getSettings({
            validate: {
                required: true,
                minLength: 2,
                maxLength: 10,
                pattern: '[a-zA-Z0-9\\s]+',
                custom: 'valid = (input === "Bob") ? "Bobs are not allowed" : true;',
                customPrivate: false
            }
        });

        // Create the text field component.
        let textField = new TextFieldComponent(this.form, settings);
        expect(textField.settings).toEqual(settings);
        expect(textField.defaultValue).toEqual('');
        expect(textField.label).toEqual('First Name');
        expect(textField.control instanceof FormControl).toEqual(true);
        expect(textField.control.value).toEqual('');

        textField.setValue('T');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({minlength: {requiredLength: 2, actualLength: 1}});
        expect(textField.getError('minlength', textField.control.errors['minlength'])).toEqual('First Name must be at least 2 characters');

        textField.setValue('');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({required: true});
        expect(textField.getError('required', textField.control.errors['required'])).toEqual('First Name is required');

        textField.setValue('Testing Testing');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({maxlength: {requiredLength: 10, actualLength: 15}});
        expect(textField.getError('maxlength', textField.control.errors['maxlength'])).toEqual('First Name cannot be more than 10 characters');

        textField.setValue('Test-');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({pattern: {requiredPattern: '^[a-zA-Z0-9\\s]+$', actualValue: 'Test-'}});
        expect(textField.getError('pattern', textField.control.errors['pattern'])).toEqual('First Name must match the pattern ^[a-zA-Z0-9\\s]+$');

        textField.setValue('Bob');
        expect(textField.control.valid).toEqual(false);
        expect(textField.control.errors).toEqual({custom: 'Bobs are not allowed'});
        expect(textField.getError('custom', textField.control.errors['custom'])).toEqual('Bobs are not allowed');

        textField.setValue('Testing');
        expect(textField.control.valid).toEqual(true);
        expect(textField.control.errors).toEqual(null);
    });

    it('Should allow default values', () => {
        let settings: InputOptions = getSettings({
            defaultValue: 'Travis'
        });

        // Create the text field component.
        let textField = new TextFieldComponent(this.form, settings);
        expect(textField.defaultValue).toEqual('Travis');
        expect(textField.control.value).toEqual('Travis');
    });

    it('Test FormioComponent for TextField', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof TextFieldComponent).toEqual(true);
        expect(component.form.value).toEqual({firstName: ''});
    });

    it('Should provide default values to the formio component.', () => {
        let component = getComponent({
            defaultValue: 'Travis'
        });
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof TextFieldComponent).toEqual(true);
        expect(component.form.value).toEqual({firstName: 'Travis'});
    });

    it('Should not allow invalid TextField values for the formio component.', () => {
        let component = getComponent({
            validate: {
                required: true,
                minLength: 2,
                maxLength: 10,
                pattern: '[a-zA-Z0-9\\s]+',
                custom: 'valid = (input === "Bob") ? "Bobs are not allowed" : true;',
                customPrivate: false
            }
        });

        let updateValue = (val: string) => {
            component.form.controls['firstName']['setValue'](val);
            component.form.controls['firstName']['markAsDirty']();
        };

        updateValue('T');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['First Name must be at least 2 characters']);

        updateValue('');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['First Name is required']);

        updateValue('Testing Testing');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['First Name cannot be more than 10 characters']);

        updateValue('Test-');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['First Name must match the pattern ^[a-zA-Z0-9\\s]+$']);

        updateValue('Bob');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Bobs are not allowed']);

        updateValue('Testing');
        expect(component.form.valid).toEqual(true);
        expect(component.errors).toEqual([]);
    });

    it('Should allow multiple text fields', () => {
        let component = getComponent({
            multiple: true
        });

        let updateValue = (index: number, val: string) => {
            component.form.controls['firstName']['at'](index)['setValue'](val);
        };

        component.addComponent();

        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('First Name');
        expect(component.components[1].label).toEqual('');

        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, 'Joe');
        updateValue(1, 'Mary');
        updateValue(2, 'Smith');
        expect(component.container.at(0).value).toEqual('Joe');
        expect(component.container.at(1).value).toEqual('Mary');
        expect(component.container.at(2).value).toEqual('Smith');
        expect(component.form.controls['firstName']['at'](0).value).toEqual('Joe');
        expect(component.form.controls['firstName']['at'](1).value).toEqual('Mary');
        expect(component.form.controls['firstName']['at'](2).value).toEqual('Smith');
        expect(component.form.value).toEqual({firstName: ['Joe', 'Mary', 'Smith']});
        component.removeAt(1);
        expect(component.container.at(0).value).toEqual('Joe');
        expect(component.container.at(1).value).toEqual('Smith');
        expect(component.form.controls['firstName']['at'](0).value).toEqual('Joe');
        expect(component.form.controls['firstName']['at'](1).value).toEqual('Smith');
        expect(component.form.value).toEqual({firstName: ['Joe', 'Smith']});
    });
});