"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var base_1 = require('../base');
var input_1 = require('../input/input');
var TextFieldComponent = (function (_super) {
    __extends(TextFieldComponent, _super);
    function TextFieldComponent(form, settings, data) {
        _super.call(this, 'text', form, settings, data);
    }
    return TextFieldComponent;
}(input_1.InputComponent));
exports.TextFieldComponent = TextFieldComponent;
var TextElement = (function (_super) {
    __extends(TextElement, _super);
    function TextElement() {
        _super.apply(this, arguments);
    }
    return TextElement;
}(base_1.BaseElement));
exports.TextElement = TextElement;
function TextField(template) {
    components_1.FormioComponents.register('textfield', TextFieldComponent, TextElement, template.components.input);
    return TextElement;
}
exports.TextField = TextField;
;
