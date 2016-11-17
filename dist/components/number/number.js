"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var base_1 = require('../base');
var input_1 = require('../input/input');
var NumberComponent = (function (_super) {
    __extends(NumberComponent, _super);
    function NumberComponent(form, settings, data) {
        _super.call(this, 'number', form, settings, data);
    }
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
    components_1.FormioComponents.register('number', NumberComponent, NumberElement, template.components.input);
    return NumberElement;
}
exports.NumberField = NumberField;
;
