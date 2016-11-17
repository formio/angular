"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var currency_1 = require('./currency');
var formio_component_component_1 = require('../../formio-component.component');
describe('CurrencyComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    // An easy method for getting new Currency settings.
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            inputType: "text",
            inputMask: "",
            label: "Currency",
            key: "currency",
            placeholder: "currency",
            prefix: "$",
            suffix: "@",
            multiple: true,
            defaultValue: "",
            protected: false,
            persistent: true,
            validate: {
                required: false
            },
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            type: "currency"
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
    it('Should allow label value', function () {
        var settings = getSettings({
            label: 'Currency'
        });
        // Create the currency component.
        var currency = new currency_1.CurrencyComponent(_this.form, settings);
        expect(currency.label).toEqual('Currency');
    });
    it('Should allow default values', function () {
        var settings = getSettings({
            defaultValue: 123
        });
        // Create the Currency component.
        var currency = new currency_1.CurrencyComponent(_this.form, settings);
        expect(currency.defaultValue).toEqual(123);
    });
    it('Test FormioComponent for Currency', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof currency_1.CurrencyComponent).toEqual(true);
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "currency"
        });
        // Create the Currency component.
        var currency = new currency_1.CurrencyComponent(_this.form, settings);
        expect(currency.settings.placeholder).toEqual("currency");
    });
    it('Should allow prefix', function () {
        var settings = getSettings({
            prefix: "$"
        });
        // Create the Currency component.
        var currency = new currency_1.CurrencyComponent(_this.form, settings);
        expect(currency.settings.prefix).toEqual("$");
    });
    it('Should allow suffix', function () {
        var settings = getSettings({
            suffix: "@"
        });
        // Create the Currency component.
        var currency = new currency_1.CurrencyComponent(_this.form, settings);
        expect(currency.settings.suffix).toEqual("@");
    });
    it('Should allow multiple currency fields', function () {
        var component = getComponent({
            multiple: true
        });
        var updateValue = function (index, val) {
            component.form.controls['currency']['at'](index)['setValue'](val);
            component.form.controls['currency']['at'](index)['markAsDirty']();
        };
        component.addComponent();
        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('Currency');
        expect(component.components[1].label).toEqual('');
        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, '1,234');
        updateValue(1, '2,345');
        updateValue(2, '52,000');
        expect(component.container.at(0).value).toEqual('1,234');
        expect(component.container.at(1).value).toEqual('2,345');
        expect(component.container.at(2).value).toEqual('52,000');
        expect(component.form.controls['currency']['at'](0).value).toEqual('1,234');
        expect(component.form.controls['currency']['at'](1).value).toEqual('2,345');
        expect(component.form.controls['currency']['at'](2).value).toEqual('52,000');
        expect(component.form.value).toEqual({ currency: ['1,234', '2,345', '52,000'] });
        component.removeAt(1);
        expect(component.container.at(0).value).toEqual('1,234');
        expect(component.container.at(1).value).toEqual('52,000');
        expect(component.form.controls['currency']['at'](0).value).toEqual('1,234');
        expect(component.form.controls['currency']['at'](1).value).toEqual('52,000');
        expect(component.form.value).toEqual({ currency: ['1,234', '52,000'] });
    });
});
