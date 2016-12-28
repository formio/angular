"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var well_1 = require('./well');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_components_component_1 = require('../../formio-components.component');
var formio_component_component_1 = require('../../formio-component.component');
var input_1 = require('../../fixtures/fields/input');
var textarea_1 = require('../../fixtures/fields/textarea');
describe('WellComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: false,
            type: "well",
            key: "Well",
            lockKey: true,
            components: [
                input_1.INPUT('textfield', 'text', 'text', 'Test1'),
                textarea_1.TEXTAREA('textarea', 'Textarea')
            ],
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
    it('Test FormioComponent for Well', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof well_1.WellComponent).toEqual(true);
    });
    it('type should be well', function () {
        var settings = getSettings({
            type: "well"
        });
        // Create the well component.
        var well = new well_1.WellComponent(_this.form, settings);
        expect(well.settings.type).toEqual("well");
    });
    it('Should create Well control.', function () {
        var settings = getSettings({});
        var fieldset = new well_1.WellComponent(_this.form, settings);
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
        expect(_this.form.value).toEqual({ text: 'Test1', textarea: 'Test2' });
    });
    it('Should contain components', function () {
        var settings = getSettings({});
        expect(settings.components.length).not.toBe(0);
    });
});
