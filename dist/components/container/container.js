"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var forms_1 = require('@angular/forms');
var base_1 = require('../base');
var components_1 = require('../components');
var ContainerComponent = (function (_super) {
    __extends(ContainerComponent, _super);
    function ContainerComponent() {
        _super.apply(this, arguments);
    }
    ContainerComponent.prototype.getControl = function () {
        if (!this.control) {
            this.control = new forms_1.FormGroup({});
        }
        return this.control;
    };
    ContainerComponent.prototype.getData = function () {
        if (this.data && this.data.hasOwnProperty(this.settings.key)) {
            return this.data[this.settings.key];
        }
        else {
            return {};
        }
    };
    return ContainerComponent;
}(base_1.BaseComponent));
exports.ContainerComponent = ContainerComponent;
var ContainerElement = (function (_super) {
    __extends(ContainerElement, _super);
    function ContainerElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ContainerElement.prototype, "numComponents", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return ContainerElement;
}(base_1.BaseElement));
exports.ContainerElement = ContainerElement;
function ContainerField(template) {
    components_1.FormioComponents.register('container', ContainerComponent, ContainerElement, template.components.container);
    return ContainerElement;
}
exports.ContainerField = ContainerField;
;
