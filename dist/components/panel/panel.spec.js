"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var panel_1 = require('./panel');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_components_component_1 = require('../../formio-components.component');
var formio_component_component_1 = require('../../formio-component.component');
describe('PanelComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: false,
            title: "Panel",
            theme: "primary",
            type: "panel",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            components: [{
                    input: true,
                    tableView: true,
                    inputType: "text",
                    inputMask: "",
                    label: "Name",
                    key: "name",
                    placeholder: "Enter your Name",
                    prefix: "",
                    suffix: "",
                    multiple: false,
                    defaultValue: "",
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: true,
                        minLength: 6,
                        maxLength: 10,
                        pattern: "",
                        custom: "",
                        customPrivate: false
                    },
                    conditional: {
                        show: "",
                        when: null,
                        eq: ""
                    },
                    type: "textfield"
                }, {
                    input: true,
                    tableView: true,
                    label: "Textarea",
                    key: "textarea",
                    placeholder: "Enter Your Text Here",
                    prefix: "",
                    suffix: "",
                    rows: 3,
                    multiple: false,
                    defaultValue: "",
                    protected: false,
                    persistent: true,
                    validate: {
                        required: true,
                        minLength: 5,
                        maxLength: 100,
                        pattern: "",
                        custom: ""
                    },
                    type: "textarea",
                    conditional: {
                        show: null,
                        when: null,
                        eq: ""
                    }
                }]
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
    it('Test FormioComponent for Panel', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof panel_1.PanelComponent).toEqual(true);
    });
    it('Should allow title value', function () {
        var settings = getSettings({
            title: "Panel"
        });
        // Create the panel component.
        var panel = new panel_1.PanelComponent(_this.form, settings);
        expect(panel.settings.title).toEqual("Panel");
    });
    it('Should allow theme value', function () {
        var settings = getSettings({
            theme: "primary"
        });
        // Create the panel component.
        var panel = new panel_1.PanelComponent(_this.form, settings);
        expect(panel.settings.theme).toEqual("primary");
    });
    it('Its type should be panel', function () {
        var settings = getSettings({
            type: "panel"
        });
        // Create the panel component.
        var panel = new panel_1.PanelComponent(_this.form, settings);
        expect(panel.settings.type).toEqual("panel");
    });
    it('Should create the Panel control.', function () {
        var settings = getSettings({});
        var panel = new panel_1.PanelComponent(_this.form, settings);
        expect(panel.control instanceof forms_1.FormGroup).toEqual(true);
        var index = 0;
        var components = new formio_components_component_1.FormioComponentsComponent();
        components.components = settings.components;
        components.form = _this.form;
        settings.components.forEach(function (comp) {
            index++;
            var component = new formio_component_component_1.FormioComponentComponent();
            component.component = comp;
            component.form = _this.form;
            component.ngOnInit();
            component.form.controls[comp.key]['setValue']('Test' + index);
            component.form.controls[comp.key]['markAsDirty']();
        });
        expect(_this.form.value).toEqual({ name: 'Test1', textarea: 'Test2' });
    });
    it('Contains components or not', function () {
        var settings = getSettings({});
        expect(settings.components.length).not.toBe(0);
    });
});
