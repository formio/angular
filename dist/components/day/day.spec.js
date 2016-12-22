"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var day_1 = require('./day');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_component_component_1 = require('../../formio-component.component');
describe('PanelComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "Day",
            key: "day",
            fields: {
                day: {
                    type: "text",
                    placeholder: "Enter day",
                    required: true
                },
                month: {
                    type: "select",
                    placeholder: "Select month",
                    required: true
                },
                year: {
                    type: "text",
                    placeholder: "Enter year",
                    required: true
                }
            },
            dayFirst: true,
            protected: false,
            persistent: true,
            validate: {
                custom: ""
            },
            type: "day",
            tags: [],
            conditional: {
                show: "",
                when: null,
                eq: ""
            },
            customClass: "dayCustomClass",
            tabindex: "5"
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
    it('Test FormioComponent for Day', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof day_1.DayComponent).toEqual(true);
    });
    it('Its type should be day', function () {
        var settings = getSettings({
            type: "day"
        });
        // Create the day component.
        var day = new day_1.DayComponent(_this.form, settings);
        expect(day.settings.type).toEqual("day");
    });
    it('Should allow day placeholder', function () {
        var settings = getSettings({
            placeholder: "Enter day"
        });
        // Create the day component.
        var day = new day_1.DayComponent(_this.form, settings);
        expect(day.settings.fields.day.placeholder).toEqual("Enter day");
        expect(day.settings.fields.month.placeholder).toEqual("Select month");
        expect(day.settings.fields.year.placeholder).toEqual("Enter year");
    });
    it('Should allow customClass', function () {
        var settings = getSettings({
            customClass: "dayCustomClass"
        });
        // Create the day component.
        var day = new day_1.DayComponent(_this.form, settings);
        expect(day.settings.customClass).toEqual("dayCustomClass");
    });
    it('Should allow required property', function () {
        var settings = getSettings({
            required: true
        });
        // Create the day component.
        var day = new day_1.DayComponent(_this.form, settings);
        expect(day.settings.fields.day.required).toEqual(true);
        expect(day.settings.fields.month.required).toEqual(true);
        expect(day.settings.fields.year.required).toEqual(true);
    });
});
