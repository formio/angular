"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var formio_component_component_1 = require('../../formio-component.component');
var address_1 = require('./address');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
describe('AddressComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "Address",
            key: "address",
            placeholder: "Enter Address",
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            validate: {
                required: true
            },
            type: "address",
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
    it('Test FormioComponent for Address', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof address_1.AddressComponent).toEqual(true);
    });
    it('Type should be Address', function () {
        var settings = getSettings({
            type: "address"
        });
        // Create the address component.
        var address = new address_1.AddressComponent(_this.form, settings);
        expect(address.settings.type).toEqual("address");
    });
    it('Should allow label', function () {
        var settings = getSettings({
            label: "Address"
        });
        // Create the address component.
        var address = new address_1.AddressComponent(_this.form, settings);
        expect(address.settings.label).toEqual("Address");
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "Enter address"
        });
        // Create the address component.
        var address = new address_1.AddressComponent(_this.form, settings);
        expect(address.settings.placeholder).toEqual("Enter address");
    });
    it('Should allow customClass', function () {
        var settings = getSettings({
            customClass: "myclass"
        });
        // Create the address component.
        var address = new address_1.AddressComponent(_this.form, settings);
        expect(address.settings.customClass).toEqual("myclass");
    });
});
