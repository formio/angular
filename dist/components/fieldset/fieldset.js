"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var forms_1 = require('@angular/forms');
var FieldSetComponent = (function (_super) {
    __extends(FieldSetComponent, _super);
    function FieldSetComponent() {
        _super.apply(this, arguments);
    }
    FieldSetComponent.prototype.getControl = function () {
        if (!this.control) {
            this.control = new forms_1.FormGroup({});
        }
        return this.control;
    };
    return FieldSetComponent;
}(base_1.BaseComponent));
exports.FieldSetComponent = FieldSetComponent;
var FieldSetElement = (function (_super) {
    __extends(FieldSetElement, _super);
    function FieldSetElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(FieldSetElement.prototype, "numComponents", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return FieldSetElement;
}(base_1.BaseElement));
exports.FieldSetElement = FieldSetElement;
function FieldSetField(template) {
    components_1.FormioComponents.register('fieldset', FieldSetComponent, FieldSetElement, template.components.fieldset);
    return FieldSetElement;
}
exports.FieldSetField = FieldSetField;
