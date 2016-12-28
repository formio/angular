"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var password_1 = require('./password');
var formio_component_component_1 = require('../../formio-component.component');
describe('PasswordComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    // An easy method for getting new password settings.
    var getSettings = function (overrides) {
        var settings = {
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
    var getComponent = function (overrides) {
        var settings = getSettings(overrides);
        var component = new formio_component_component_1.FormioComponentComponent();
        component.component = settings;
        component.form = _this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Password', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof password_1.PasswordComponent).toEqual(true);
    });
    it('Should allow label value', function () {
        var settings = getSettings({
            label: 'Password'
        });
        // Create the password component.
        var password = new password_1.PasswordComponent(_this.form, settings);
        expect(password.label).toEqual('Password');
    });
    it('Should not allow invalid Password values.', function () {
        var settings = getSettings({
            validate: {
                required: true,
                minLength: 8,
                pattern: '(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}'
            }
        });
        // Create the password component.
        var password = new password_1.PasswordComponent(_this.form, settings);
        expect(password.settings).toEqual(settings);
        expect(password.label).toEqual('Password');
        expect(password.control instanceof forms_1.FormControl).toEqual(true);
        password.setValue('');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({ required: true });
        expect(password.getError('required', password.control.errors['required'])).toEqual('Password is required');
        // The password must be at least 8 characters
        password.setValue('P');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({ minlength: ({ requiredLength: 8, actualLength: 1 }), pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'P' }) });
        expect(password.getError('minlength', password.control.errors['minlength'])).toEqual('Password must be at least 8 characters');
        // The password should not contain only lower case letters
        password.setValue('testingg');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({ pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'testingg' }) });
        expect(password.getError('pattern', password.control.errors['pattern'])).toEqual('Password must match the pattern ^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');
        // The password should not contain only upper case letters
        password.setValue('TESTINGG');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({ pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'TESTINGG' }) });
        expect(password.getError('pattern', password.control.errors['pattern'])).toEqual('Password must match the pattern ^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');
        // The password should contain upper case and lower case letters along with numbers
        password.setValue('Testingg');
        expect(password.control.valid).toEqual(false);
        expect(password.control.errors).toEqual({ pattern: ({ requiredPattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$', actualValue: 'Testingg' }) });
        expect(password.getError('pattern', password.control.errors['pattern'])).toEqual('Password must match the pattern ^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');
        // The password should have atleast 1 upper case letter, 1 lower case letter and 1 number
        password.setValue('Testing123');
        expect(password.control.valid).toEqual(true);
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "Enter Password"
        });
        // Create the password component.
        var number = new password_1.PasswordComponent(_this.form, settings);
        expect(number.settings.placeholder).toEqual("Enter Password");
    });
    it('Should allow prefix', function () {
        var settings = getSettings({
            prefix: "$"
        });
        // Create the password component.
        var number = new password_1.PasswordComponent(_this.form, settings);
        expect(number.settings.prefix).toEqual("$");
    });
    it('Should allow suffix', function () {
        var settings = getSettings({
            suffix: "@"
        });
        // Create the password component.
        var number = new password_1.PasswordComponent(_this.form, settings);
        expect(number.settings.suffix).toEqual("@");
    });
});
