"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var forms_1 = require('@angular/forms');
var WellComponent = (function (_super) {
    __extends(WellComponent, _super);
    function WellComponent() {
        _super.apply(this, arguments);
    }
    WellComponent.prototype.getControl = function () {
        if (!this.control) {
            this.control = new forms_1.FormGroup({});
        }
        return this.control;
    };
    return WellComponent;
}(base_1.BaseComponent));
exports.WellComponent = WellComponent;
var WellElement = (function (_super) {
    __extends(WellElement, _super);
    function WellElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(WellElement.prototype, "numComponents", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return WellElement;
}(base_1.BaseElement));
exports.WellElement = WellElement;
function WellField(template) {
    components_1.FormioComponents.register('well', WellComponent, WellElement, template.components.well);
    return WellElement;
}
exports.WellField = WellField;
