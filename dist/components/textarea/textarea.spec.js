"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var textarea_1 = require('./textarea');
var textarea_2 = require('../../fixtures/fields/textarea');
var formio_component_component_1 = require('../../formio-component.component');
describe('TextAreaComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    // An easy method for getting new text area settings.
    var getSettings = function (overrides) {
        var settings = textarea_2.TEXTAREA('textarea', 'Textarea');
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
            label: 'TextArea'
        });
        // Create the text area component.
        var textarea = new textarea_1.TextAreaComponent(_this.form, settings);
        expect(textarea.label).toEqual('TextArea');
    });
    it('Should allow placeholder value', function () {
        var settings = getSettings({
            placeholder: 'Enter your text here'
        });
        // Create the text area component.
        var textarea = new textarea_1.TextAreaComponent(_this.form, settings);
        expect(textarea.settings.placeholder).toEqual('Enter your text here');
    });
    it('Should allow prefix', function () {
        var settings = getSettings({
            prefix: "$"
        });
        // Create the text area component.
        var textarea = new textarea_1.TextAreaComponent(_this.form, settings);
        expect(textarea.settings.prefix).toEqual("$");
    });
    it('Should allow suffix', function () {
        var settings = getSettings({
            suffix: "@"
        });
        // Create the text area component.
        var textarea = new textarea_1.TextAreaComponent(_this.form, settings);
        expect(textarea.settings.suffix).toEqual("@");
    });
    it('Should not allow invalid TextArea values.', function () {
        var settings = getSettings({
            validate: {
                required: true,
                minLength: 2,
                maxLength: 10,
                pattern: '',
                custom: '',
                customPrivate: false
            }
        });
        // Create the text area component.
        var textarea = new textarea_1.TextAreaComponent(_this.form, settings);
        expect(textarea.settings).toEqual(settings);
        expect(textarea.label).toEqual('Textarea');
        expect(textarea.control instanceof forms_1.FormControl).toEqual(true);
        textarea.setValue("te");
        expect(textarea.control.valid).toEqual(true);
        textarea.setValue('T');
        expect(textarea.control.valid).toEqual(false);
        expect(textarea.control.errors).toEqual({ minlength: { requiredLength: 2, actualLength: 1 } });
        expect(textarea.getError('minlength', textarea.control.errors['minlength'])).toEqual('Textarea must be at least 2 characters');
        textarea.setValue('');
        expect(textarea.control.valid).toEqual(false);
        expect(textarea.control.errors).toEqual({ required: true });
        expect(textarea.getError('required', textarea.control.errors['required'])).toEqual('Textarea is required');
        textarea.setValue("textareass");
        expect(textarea.control.valid).toEqual(true);
        textarea.setValue('Testing Testing');
        expect(textarea.control.valid).toEqual(false);
        expect(textarea.control.errors).toEqual({ maxlength: { requiredLength: 10, actualLength: 15 } });
        expect(textarea.getError('maxlength', textarea.control.errors['maxlength'])).toEqual('Textarea cannot be more than 10 characters');
        textarea.setValue('Testing');
        expect(textarea.control.valid).toEqual(true);
        expect(textarea.control.errors).toEqual(null);
    });
    it('Should allow default values', function () {
        var settings = getSettings({
            defaultValue: 'Textarea'
        });
        // Create the text area component.
        var textarea = new textarea_1.TextAreaComponent(_this.form, settings);
        expect(textarea.defaultValue).toEqual('Textarea');
        expect(textarea.control.value).toEqual('Textarea');
    });
    it('Test FormioComponent for TextArea', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof textarea_1.TextAreaComponent).toEqual(true);
    });
    it('Should not allow invalid textarea values for the formio component.', function () {
        var component = getComponent({
            validate: {
                required: true,
                minLength: 2,
                maxLength: 10,
                pattern: '',
                custom: '',
                customPrivate: false
            }
        });
        var updateValue = function (val) {
            component.form.controls['textarea']['setValue'](val);
            component.form.controls['textarea']['markAsDirty']();
        };
        updateValue('T');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Textarea must be at least 2 characters']);
        updateValue('');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Textarea is required']);
        updateValue('Testing Testing');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Textarea cannot be more than 10 characters']);
        updateValue('Testing');
        expect(component.form.valid).toEqual(true);
        expect(component.errors).toEqual([]);
    });
    it('Should allow multiple text areas', function () {
        var component = getComponent({
            multiple: true
        });
        var updateValue = function (index, val) {
            component.form.controls['textarea']['at'](index)['setValue'](val);
            component.form.controls['textarea']['at'](index)['markAsDirty']();
        };
        component.addComponent();
        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('Textarea');
        expect(component.components[1].label).toEqual('');
        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, 'Joe');
        updateValue(1, 'Mary');
        updateValue(2, 'Smith');
        expect(component.container.at(0).value).toEqual('Joe');
        expect(component.container.at(1).value).toEqual('Mary');
        expect(component.container.at(2).value).toEqual('Smith');
        expect(component.form.controls['textarea']['at'](0).value).toEqual('Joe');
        expect(component.form.controls['textarea']['at'](1).value).toEqual('Mary');
        expect(component.form.controls['textarea']['at'](2).value).toEqual('Smith');
        expect(component.form.value).toEqual({ textarea: ['Joe', 'Mary', 'Smith'] });
        component.removeAt(1);
        expect(component.container.at(0).value).toEqual('Joe');
        expect(component.container.at(1).value).toEqual('Smith');
        expect(component.form.controls['textarea']['at'](0).value).toEqual('Joe');
        expect(component.form.controls['textarea']['at'](1).value).toEqual('Smith');
        expect(component.form.value).toEqual({ textarea: ['Joe', 'Smith'] });
    });
});
