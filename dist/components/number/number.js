"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var base_1 = require('../base');
var input_1 = require('../input/input');
function NumberValidator(component) {
    return function (control) {
        if (control.value && control.value < component.settings.validate.min) {
            return { 'minValue': true };
        }
        else if (control.value && control.value > component.settings.validate.max) {
            return { 'maxValue': true };
        }
        return null;
    };
}
exports.NumberValidator = NumberValidator;
var NumberComponent = (function (_super) {
    __extends(NumberComponent, _super);
    function NumberComponent(form, settings, data) {
        _super.call(this, 'number', form, settings, data);
    }
    NumberComponent.prototype.getError = function (type, error) {
        var message = _super.prototype.getError.call(this, type, error);
        if (!message && (type === 'minValue')) {
            message = this.label + ' should not be smaller than ' + this.settings.validate.min;
        }
        else if (!message && (type === 'maxValue')) {
            message = this.label + ' should not be greater than ' + this.settings.validate.max;
        }
        return message;
    };
    NumberComponent.prototype.addValidators = function () {
        _super.prototype.addValidators.call(this);
        this.validators.push(NumberValidator(this));
    };
    return NumberComponent;
}(input_1.InputComponent));
exports.NumberComponent = NumberComponent;
var NumberElement = (function (_super) {
    __extends(NumberElement, _super);
    function NumberElement() {
        _super.apply(this, arguments);
    }
    return NumberElement;
}(base_1.BaseElement));
exports.NumberElement = NumberElement;
function NumberField(template) {
    components_1.FormioComponents.register('number', NumberComponent, NumberElement, template.components.number);
    return NumberElement;
}
exports.NumberField = NumberField;
