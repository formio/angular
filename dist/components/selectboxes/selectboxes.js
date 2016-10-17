"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var SelectBoxComponent = (function (_super) {
    __extends(SelectBoxComponent, _super);
    function SelectBoxComponent() {
        _super.apply(this, arguments);
    }
    return SelectBoxComponent;
}(base_1.BaseComponent));
exports.SelectBoxComponent = SelectBoxComponent;
var SelectBoxElement = (function (_super) {
    __extends(SelectBoxElement, _super);
    function SelectBoxElement() {
        _super.apply(this, arguments);
        this.selected = [];
    }
    return SelectBoxElement;
}(base_1.BaseElement));
exports.SelectBoxElement = SelectBoxElement;
function SelectBoxField(template) {
    components_1.FormioComponents.register('selectboxes', SelectBoxComponent, SelectBoxElement, template.components.selectboxes);
    return SelectBoxElement;
}
exports.SelectBoxField = SelectBoxField;
