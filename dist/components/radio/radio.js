"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var RadioComponent = (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent() {
        _super.apply(this, arguments);
    }
    return RadioComponent;
}(base_1.BaseComponent));
exports.RadioComponent = RadioComponent;
var RadioElement = (function (_super) {
    __extends(RadioElement, _super);
    function RadioElement() {
        _super.apply(this, arguments);
    }
    return RadioElement;
}(base_1.BaseElement));
exports.RadioElement = RadioElement;
function RadioField(template) {
    components_1.FormioComponents.register('radio', RadioComponent, RadioElement, template.components.radio);
    return RadioElement;
}
exports.RadioField = RadioField;
