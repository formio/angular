"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var formio_component_component_1 = require('../../formio-component.component');
var select_1 = require('./select');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
describe('SelectComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "Fruits",
            key: "fruits",
            placeholder: "Select favourite",
            data: {
                values: [
                    {
                        value: "mango",
                        label: "mango"
                    },
                    {
                        value: "apple",
                        label: "apple"
                    },
                    {
                        value: "pineapple",
                        label: "pineapple"
                    },
                    {
                        value: "grapes",
                        label: "grapes"
                    }],
                json: [
                    {
                        label: "one",
                        test: "opt1"
                    },
                    {
                        label: "two",
                        test: "opt2"
                    },
                    {
                        label: "three",
                        test: "opt3"
                    }],
                url: "https://api.github.com/users/hadley/orgs",
                resource: "manager"
            },
            dataSrc: "values",
            valueProperty: "label",
            defaultValue: "",
            refreshOn: "",
            filter: "",
            authenticate: false,
            searchField: "data.fullName",
            template: "<span>{{ item.label }}</span>",
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            validate: {
                required: false
            },
            type: "select",
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
    it('Test FormioComponent for Select', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof select_1.SelectComponent).toEqual(true);
    });
    it('Type should be Select', function () {
        var settings = getSettings({
            type: "select"
        });
        // Create the select component.
        var select = new select_1.SelectComponent(_this.form, settings);
        expect(select.settings.type).toEqual("select");
    });
    it('Should allow label', function () {
        var settings = getSettings({
            label: "Fruits"
        });
        // Create the select component.
        var select = new select_1.SelectComponent(_this.form, settings);
        expect(select.settings.label).toEqual("Fruits");
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "Select one fruit"
        });
        // Create the select component.
        var select = new select_1.SelectComponent(_this.form, settings);
        expect(select.settings.placeholder).toEqual("Select one fruit");
    });
    it('Should allow valueProperty', function () {
        var settings = getSettings({
            valueProperty: "fullName"
        });
        // Create the select component.
        var select = new select_1.SelectComponent(_this.form, settings);
        expect(select.settings.valueProperty).toEqual("fullName");
    });
    it('Should allow template', function () {
        var settings = getSettings({
            template: "{{ item.label }}"
        });
        // Create the select component.
        var select = new select_1.SelectComponent(_this.form, settings);
        expect(select.settings.template).toEqual("{{ item.label }}");
    });
    it('Should set the data according to dataSrc', function () {
        var component = getComponent({});
        if (component.components[0].settings.dataSrc == 'values') {
            expect(component.components[0].settings.data.values.length).not.toBe(0);
        }
        if (component.components[0].settings.dataSrc == 'json') {
            expect(component.components[0].settings.data.json.length).not.toBe(0);
        }
        if (component.components[0].settings.dataSrc == 'resource') {
            expect(component.components[0].settings.data.resource).not.toBe(null);
        }
        if (component.components[0].settings.dataSrc == 'url') {
            expect(component.components[0].settings.data.url).not.toBe(null);
        }
    });
    it('Should contain data according to template', function () {
        var component = getComponent({});
        var template = component.components[0].settings.template.split('.')[1].split(' ')[0];
        if (component.components[0].settings.dataSrc == 'values') {
            expect(Object.keys(component.components[0].settings.data.values[0])).toContain('label');
        }
        if (component.components[0].settings.dataSrc == 'json') {
            expect(Object.keys(component.components[0].settings.data.json[0])).toContain(template);
        }
    });
    it('Should contain data according to valueProperty', function () {
        var component = getComponent({});
        if (component.components[0].settings.dataSrc == 'values') {
            expect(Object.keys(component.components[0].settings.data.values[0])).toContain('value');
        }
        if (component.components[0].settings.dataSrc == 'json') {
            expect(Object.keys(component.components[0].settings.data.json[0])).toContain(component.components[0].settings.valueProperty);
        }
    });
});
