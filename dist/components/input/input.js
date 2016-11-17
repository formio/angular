"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var forms_1 = require('@angular/forms');
var base_1 = require('../base');
var InputComponent = (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent(inputType, form, settings, data) {
        settings.inputType = inputType;
        _super.call(this, form, settings, data);
    }
    InputComponent.prototype.getError = function (type, error) {
        var message = _super.prototype.getError.call(this, type, error);
        if (!message) {
            switch (type) {
                case 'minlength':
                    message = this.label + ' must be at least ' + error.requiredLength + ' characters';
                    break;
                case 'maxlength':
                    message = this.label + ' cannot be more than ' + error.requiredLength + ' characters';
                    break;
                case 'pattern':
                    message = this.label + ' must match the pattern ' + error.requiredPattern;
                    break;
            }
        }
        return message;
    };
    InputComponent.prototype.addValidators = function () {
        _super.prototype.addValidators.call(this);
        if (!this.settings.validate) {
            return;
        }
        if (this.settings.validate.minLength) {
            //noinspection TypeScriptValidateTypes
            this.validators.push(forms_1.Validators.minLength(parseInt(this.settings.validate.minLength, 10)));
        }
        if (this.settings.validate.maxLength) {
            //noinspection TypeScriptValidateTypes
            this.validators.push(forms_1.Validators.maxLength(parseInt(this.settings.validate.maxLength, 10)));
        }
        if (this.settings.validate.pattern) {
            this.validators.push(forms_1.Validators.pattern(this.settings.validate.pattern));
        }
    };
    return InputComponent;
}(base_1.BaseComponent));
exports.InputComponent = InputComponent;
