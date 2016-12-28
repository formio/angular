"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var base_1 = require('../base');
var input_1 = require('../input/input');
var PasswordComponent = (function (_super) {
    __extends(PasswordComponent, _super);
    function PasswordComponent(form, settings, data) {
        _super.call(this, 'password', form, settings, data);
    }
    return PasswordComponent;
}(input_1.InputComponent));
exports.PasswordComponent = PasswordComponent;
var PasswordElement = (function (_super) {
    __extends(PasswordElement, _super);
    function PasswordElement() {
        _super.apply(this, arguments);
    }
    return PasswordElement;
}(base_1.BaseElement));
exports.PasswordElement = PasswordElement;
function PasswordField(template) {
    components_1.FormioComponents.register('password', PasswordComponent, PasswordElement, template.components.input);
    return PasswordElement;
}
exports.PasswordField = PasswordField;
;
