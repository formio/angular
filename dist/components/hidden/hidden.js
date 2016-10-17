"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var HiddenComponent = (function (_super) {
    __extends(HiddenComponent, _super);
    function HiddenComponent() {
        _super.apply(this, arguments);
    }
    return HiddenComponent;
}(base_1.BaseComponent));
exports.HiddenComponent = HiddenComponent;
var HiddenElement = (function (_super) {
    __extends(HiddenElement, _super);
    function HiddenElement() {
        _super.apply(this, arguments);
    }
    return HiddenElement;
}(base_1.BaseElement));
exports.HiddenElement = HiddenElement;
function HiddenField(template) {
    components_1.FormioComponents.register('hidden', HiddenComponent, HiddenElement, template.components.hidden);
    return HiddenElement;
}
exports.HiddenField = HiddenField;
;
