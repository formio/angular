"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("../base");
var components_1 = require("../components");
var CheckBoxComponent = (function (_super) {
    __extends(CheckBoxComponent, _super);
    function CheckBoxComponent() {
        return _super.apply(this, arguments) || this;
    }
    return CheckBoxComponent;
}(base_1.BaseComponent));
exports.CheckBoxComponent = CheckBoxComponent;
var CheckBoxElement = (function (_super) {
    __extends(CheckBoxElement, _super);
    function CheckBoxElement() {
        return _super.apply(this, arguments) || this;
    }
    return CheckBoxElement;
}(base_1.BaseElement));
exports.CheckBoxElement = CheckBoxElement;
function CheckBoxField(template) {
    components_1.FormioComponents.register('checkbox', CheckBoxComponent, CheckBoxElement, template.components.checkbox);
    return CheckBoxElement;
}
exports.CheckBoxField = CheckBoxField;
