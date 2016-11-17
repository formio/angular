"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var radio_1 = require('./radio');
var formio_component_component_1 = require('../../formio-component.component');
describe('RadioComponent', function () {
    beforeEach(function () {
        _this.form = new forms_1.FormGroup({});
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
    });
    // An easy method for getting new Radio settings.
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "Options",
            key: "radio",
            values: [
                {
                    value: "1",
                    label: "option1"
                },
                {
                    value: "2",
                    label: "option2"
                }
            ],
            defaultValue: '',
            protected: false,
            persistent: true,
            validate: {
                required: false,
                custom: "",
                customPrivate: false
            },
            type: "radio",
            inline: true,
            multiple: false,
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
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
    it('Test FormioComponent for Radio', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof radio_1.RadioComponent).toEqual(true);
    });
    it('Should allow label value', function () {
        var settings = getSettings({
            label: 'Options'
        });
        // Create the radio component.
        var radio = new radio_1.RadioComponent(_this.form, settings);
        expect(radio.label).toEqual('Options');
    });
    it('Should allow Radio component with required', function () {
        var settings = getSettings({
            required: true
        });
        // Create the radio component.
        var radio = new radio_1.RadioComponent(_this.form, settings);
        expect(radio.settings.required).toEqual(true);
    });
    it('Check radio option values are available or not', function () {
        var settings = getSettings({
            values: [
                {
                    value: "1",
                    label: "option1"
                },
                {
                    value: "2",
                    label: "option2"
                }
            ]
        });
        // Create the radio component.
        var radio = new radio_1.RadioComponent(_this.form, settings);
        expect(radio.settings.values.length).not.toEqual(0);
    });
    it('Check radio options contains labels or not', function () {
        var settings = getSettings({
            values: [
                {
                    value: "1",
                    label: "option1"
                }
            ]
        });
        // Create the radio component.
        var radio = new radio_1.RadioComponent(_this.form, settings);
        expect(radio.settings.values[0].label).not.toEqual('');
    });
    it('Check radio options appears in inline or not', function () {
        var settings = getSettings({
            inline: true
        });
        // Create the radio component.
        var radio = new radio_1.RadioComponent(_this.form, settings);
        expect(radio.settings.inline).toEqual(true);
    });
});
