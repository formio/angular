"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var selectboxes_1 = require('./selectboxes');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_component_component_1 = require('../../formio-component.component');
describe('SelectBoxComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "Select box",
            key: "selectbox",
            values: [
                {
                    value: "tea",
                    label: "Tea"
                },
                {
                    value: "tea",
                    label: "Coffee"
                },
                {
                    value: "chocolate",
                    label: "Chocolate"
                }
            ],
            inline: true,
            protected: false,
            persistent: true,
            validate: {
                required: false
            },
            type: "selectboxes",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            customClass: "myselect"
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
    it('Test FormioComponent for SelectBox as Custom component', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof selectboxes_1.SelectBoxComponent).toEqual(true);
    });
    it('Its type should be selectboxes', function () {
        var settings = getSettings({
            type: "selectboxes"
        });
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.type).toEqual("selectboxes");
    });
    it('Should allow label value', function () {
        var settings = getSettings({
            label: "SelectBox"
        });
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.label).toEqual("SelectBox");
    });
    it('Should allow SelectBox component with required', function () {
        var settings = getSettings({
            required: true
        });
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.required).toEqual(true);
    });
    it('Check SelectBox option values are available or not', function () {
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
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.values.length).not.toEqual(0);
    });
    it('Check SelectBox options contains labels or not', function () {
        var settings = getSettings({
            values: [
                {
                    value: "1",
                    label: "option1"
                }
            ]
        });
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.values[0].label).not.toEqual('');
    });
    it('Check SelectBox options appears in inline or not', function () {
        var settings = getSettings({
            inline: true
        });
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.inline).toEqual(true);
    });
    it('Should allow custom class', function () {
        var settings = getSettings({
            customClass: "myselect"
        });
        // Create the selectbox component.
        var selectbox = new selectboxes_1.SelectBoxComponent(_this.form, settings);
        expect(selectbox.settings.customClass).toEqual("myselect");
    });
});
