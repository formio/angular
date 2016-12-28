"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var PhoneNumberComponent = (function (_super) {
    __extends(PhoneNumberComponent, _super);
    function PhoneNumberComponent() {
        _super.apply(this, arguments);
    }
    return PhoneNumberComponent;
}(base_1.BaseComponent));
exports.PhoneNumberComponent = PhoneNumberComponent;
var PhoneNumberElement = (function (_super) {
    __extends(PhoneNumberElement, _super);
    function PhoneNumberElement() {
        _super.apply(this, arguments);
    }
    PhoneNumberElement.prototype.unmask = function (val) {
        return val.replace(/\D+/g, '');
    };
    PhoneNumberElement.prototype.ngOnInit = function () {
        this.mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.mask[0] = this.component.settings.inputMask.split('')[0];
        this.mask[4] = this.component.settings.inputMask.split('')[4];
        this.mask[9] = this.component.settings.inputMask.split('')[9];
    };
    return PhoneNumberElement;
}(base_1.BaseElement));
exports.PhoneNumberElement = PhoneNumberElement;
function PhoneNumberField(template) {
    components_1.FormioComponents.register('phoneNumber', PhoneNumberComponent, PhoneNumberElement, template.components.phoneNumber);
    return PhoneNumberElement;
}
exports.PhoneNumberField = PhoneNumberField;
