"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var base_1 = require('../base');
var input_1 = require('../input/input');
var TextAreaComponent = (function (_super) {
    __extends(TextAreaComponent, _super);
    function TextAreaComponent(form, settings, data) {
        _super.call(this, 'textarea', form, settings, data);
    }
    return TextAreaComponent;
}(input_1.InputComponent));
exports.TextAreaComponent = TextAreaComponent;
var TextAreaElement = (function (_super) {
    __extends(TextAreaElement, _super);
    function TextAreaElement() {
        _super.apply(this, arguments);
    }
    return TextAreaElement;
}(base_1.BaseElement));
exports.TextAreaElement = TextAreaElement;
function TextAreaField(template) {
    components_1.FormioComponents.register('textarea', TextAreaComponent, TextAreaElement, template.components.textarea);
    return TextAreaElement;
}
exports.TextAreaField = TextAreaField;
;
