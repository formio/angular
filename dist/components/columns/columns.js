"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var ColumnsComponent = (function (_super) {
    __extends(ColumnsComponent, _super);
    function ColumnsComponent() {
        _super.apply(this, arguments);
    }
    return ColumnsComponent;
}(base_1.BaseComponent));
exports.ColumnsComponent = ColumnsComponent;
var ColumnsElement = (function (_super) {
    __extends(ColumnsElement, _super);
    function ColumnsElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ColumnsElement.prototype, "numComponents", {
        get: function () {
            return this.component.settings.columns.length;
        },
        enumerable: true,
        configurable: true
    });
    return ColumnsElement;
}(base_1.BaseElement));
exports.ColumnsElement = ColumnsElement;
function ColumnsField(template) {
    components_1.FormioComponents.register('columns', ColumnsComponent, ColumnsElement, template.components.columns);
    return ColumnsElement;
}
exports.ColumnsField = ColumnsField;
;
