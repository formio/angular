"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var fieldset_1 = require('./fieldset');
var formio_components_component_1 = require('../../formio-components.component');
var formio_component_component_1 = require('../../formio-component.component');
describe('FieldSetComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: false,
            tableView: true,
            legend: "FieldSet",
            type: "fieldset",
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
                    label: "FirstName",
                    key: "firstName",
                    placeholder: "Enter FirstName",
                    prefix: "",
                    suffix: "",
                    multiple: false,
                    defaultValue: "",
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: false,
                        minLength: "",
                        maxLength: "",
                        pattern: "",
                        custom: "",
                        customPrivate: false
                    },
                    conditional: {
                        show: null,
                        when: null,
                        eq: ""
                    },
                    type: "textfield"
                }, {
                    input: true,
                    tableView: true,
                    inputType: "text",
                    inputMask: "",
                    label: "LastName",
                    key: "lastName",
                    placeholder: "Enter LastName",
                    prefix: "",
                    suffix: "",
                    multiple: false,
                    defaultValue: "",
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: false,
                        minLength: "",
                        maxLength: "",
                        pattern: "",
                        custom: "",
                        customPrivate: false
                    },
                    conditional: {
                        show: null,
                        when: null,
                        eq: ""
                    },
                    type: "textfield"
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
    it('Test FormioComponent for FieldSet', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof fieldset_1.FieldSetComponent).toEqual(true);
    });
    it('Should allow legend value', function () {
        var settings = getSettings({
            legend: "FieldSet"
        });
        // Create the fieldset component.
        var fieldset = new fieldset_1.FieldSetComponent(_this.form, settings);
        expect(fieldset.settings.legend).toEqual("FieldSet");
    });
    it('Its type should be fieldset', function () {
        var settings = getSettings({
            type: "fieldset"
        });
        // Create the fieldset component.
        var fieldset = new fieldset_1.FieldSetComponent(_this.form, settings);
        expect(fieldset.settings.type).toEqual("fieldset");
    });
    it('Should create the FieldSet control.', function () {
        var settings = getSettings({});
        var fieldset = new fieldset_1.FieldSetComponent(_this.form, settings);
        expect(fieldset.control instanceof forms_1.FormGroup).toEqual(true);
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
        expect(_this.form.value).toEqual({ firstName: 'Test1', lastName: 'Test2' });
    });
    it('Contains components or not', function () {
        var settings = getSettings({});
        expect(settings.components.length).not.toBe(0);
    });
});
