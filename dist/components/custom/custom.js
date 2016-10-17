"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var base_1 = require('../base');
var CustomComponent = (function (_super) {
    __extends(CustomComponent, _super);
    function CustomComponent() {
        _super.apply(this, arguments);
    }
    return CustomComponent;
}(base_1.BaseComponent));
exports.CustomComponent = CustomComponent;
var CustomElement = (function (_super) {
    __extends(CustomElement, _super);
    function CustomElement() {
        _super.apply(this, arguments);
    }
    return CustomElement;
}(base_1.BaseElement));
exports.CustomElement = CustomElement;
function CustomField(template) {
    components_1.FormioComponents.register('custom', CustomComponent, CustomElement, template.components.custom);
    return CustomElement;
}
exports.CustomField = CustomField;
;
