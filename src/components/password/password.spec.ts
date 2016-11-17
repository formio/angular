/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup, FormControl } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { InputOptions } from '../input/input';
import { PasswordComponent } from './password';
import { FormioComponentComponent } from '../../formio-component.component';

describe('PasswordComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new password settings.
    var getSettings = (overrides: {}): InputOptions => {
        let settings: InputOptions = {
            input: true,
            tableView: false,
            inputType: "password",
            label: "Password",
            key: "password",
            placeholder: "Enter Your Password",
            prefix: "$",
            suffix: "@",
            protected: true,
            persistent: true,
            type: "password",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            validate: {
                required: true,
                minLength: 8,
                pattern: "",
                custom: "",
                customPrivate: false
            },
            unique: true
        };
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
    };

    it('Test FormioComponent for Password', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof PasswordComponent).toEqual(true);
    });

    it('Should allow label value', () => {
        let settings: InputOptions = getSettings({
            label: 'Password'
        });

        // Create the password component.
        let password = new PasswordComponent(this.form, settings);
        expect(password.label).toEqual('Password');
    });

    it('Should not allow invalid Password values.', () => {
        let settings: InputOptions = getSettings({
            validate: {
                required: true,
                minLength: 8,
                pattern: '(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}'
            }
        });

        // Create the password component.
        let password = new PasswordComponent(this.form, settings);
        expect(password.settings).toEqual(settings);
        expect(password.label).toEqual('Password');
        expect(password.control instanceof FormControl).toEqual(true);

        password.setValue('');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({required: true});
        expect(password.getError('required', password.control.errors['required'])).toEqual('Password is required');

        // The password must be at least 8 characters
        password.setValue('P');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({ minlength: ({ requiredLength: 8, actualLength: 1 }), pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'P' }) });
        expect(password.getError('minlength', password.control.errors['minlength'])).toEqual('Password must be at least 8 characters');

        // The password should not contain only lower case letters
        password.setValue('testingg');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'testingg' })});
        expect(password.getError('pattern', password.control.errors['pattern'])).toEqual('Password must match the pattern ^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');

        // The password should not contain only upper case letters
        password.setValue('TESTINGG');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'TESTINGG' })});
        expect(password.getError('pattern', password.control.errors['pattern'])).toEqual('Password must match the pattern ^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');

        // The password should contain upper case and lower case letters along with numbers
        password.setValue('Testingg');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'Testingg' })});
        expect(password.getError('pattern', password.control.errors['pattern'])).toEqual('Password must match the pattern ^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');

        // The password should have atleast 1 upper case letter, 1 lower case letter and 1 number
        password.setValue('Testing123');
        expect(password.control.valid).toEqual(true);
    });

    it('Should allow placeholder', () => {
        let settings: InputOptions = getSettings({
            placeholder: "Enter Password"
        });

        // Create the password component.
        let number = new PasswordComponent(this.form, settings);
        expect(number.settings.placeholder).toEqual("Enter Password");
    });

    it('Should allow prefix', () => {
        let settings: InputOptions = getSettings({
            prefix: "$"
        });

        // Create the password component.
        let number = new PasswordComponent(this.form, settings);
        expect(number.settings.prefix).toEqual("$");
    });

    it('Should allow suffix', () => {
        let settings: InputOptions = getSettings({
            suffix: "@"
        });

        // Create the password component.
        let number = new PasswordComponent(this.form, settings);
        expect(number.settings.suffix).toEqual("@");
    });
});
