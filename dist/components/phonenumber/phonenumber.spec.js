"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var formio_component_component_1 = require('../../formio-component.component');
var phonenumber_1 = require('./phonenumber');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
describe('PhoneNumberComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            inputMask: "(999) 999-9999",
            label: "Phone Number",
            key: "phoneNumber",
            placeholder: "Enter Phone Number",
            prefix: "",
            suffix: "",
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            defaultValue: "",
            validate: {
                required: false
            },
            type: "phoneNumber",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            customClass: "myclass"
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
    it('Test FormioComponent for PhoneNumber', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof phonenumber_1.PhoneNumberComponent).toEqual(true);
    });
    it('Type should be PhoneNumber', function () {
        var settings = getSettings({
            type: "phoneNumber"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.type).toEqual("phoneNumber");
    });
    it('Should allow label', function () {
        var settings = getSettings({
            label: "Phone Number"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.label).toEqual("Phone Number");
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "Enter Phone Number"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.placeholder).toEqual("Enter Phone Number");
    });
    it('Should allow inputMask', function () {
        var settings = getSettings({
            inputMask: "(999) 999-9999"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.inputMask).toEqual("(999) 999-9999");
    });
    it('Should allow customClass', function () {
        var settings = getSettings({
            customClass: "myclass"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.customClass).toEqual("myclass");
    });
    it('Should allow prefix', function () {
        var settings = getSettings({
            prefix: "$"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.prefix).toEqual("$");
    });
    it('Should allow suffix', function () {
        var settings = getSettings({
            suffix: "@"
        });
        // Create the phone component.
        var phone = new phonenumber_1.PhoneNumberComponent(_this.form, settings);
        expect(phone.settings.suffix).toEqual("@");
    });
    it('Should allow multiple phone number fields', function () {
        var component = getComponent({
            multiple: true
        });
        var updateValue = function (index, val) {
            component.form.controls['phoneNumber']['at'](index)['updateValue'](val);
            component.form.controls['phoneNumber']['at'](index)['markAsDirty']();
        };
        component.addComponent();
        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('Phone Number');
        expect(component.components[1].label).toEqual('');
        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, '1234567890');
        updateValue(1, '9999999999');
        updateValue(2, '8989898989');
        expect(component.container.at(0).value).toEqual('1234567890');
        expect(component.container.at(1).value).toEqual('9999999999');
        expect(component.container.at(2).value).toEqual('8989898989');
        expect(component.form.controls['phoneNumber']['at'](0).value).toEqual('1234567890');
        expect(component.form.controls['phoneNumber']['at'](1).value).toEqual('9999999999');
        expect(component.form.controls['phoneNumber']['at'](2).value).toEqual('8989898989');
        expect(component.form.value).toEqual({ phoneNumber: ['1234567890', '9999999999', '8989898989'] });
        component.removeAt(1);
        expect(component.container.at(0).value).toEqual('1234567890');
        expect(component.container.at(1).value).toEqual('8989898989');
        expect(component.form.controls['phoneNumber']['at'](0).value).toEqual('1234567890');
        expect(component.form.controls['phoneNumber']['at'](1).value).toEqual('8989898989');
        expect(component.form.value).toEqual({ phoneNumber: ['1234567890', '8989898989'] });
    });
});
