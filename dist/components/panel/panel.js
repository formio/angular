"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var forms_1 = require('@angular/forms');
var PanelComponent = (function (_super) {
    __extends(PanelComponent, _super);
    function PanelComponent() {
        _super.apply(this, arguments);
    }
    PanelComponent.prototype.getControl = function () {
        if (!this.control) {
            this.control = new forms_1.FormGroup({});
        }
        return this.control;
    };
    return PanelComponent;
}(base_1.BaseComponent));
exports.PanelComponent = PanelComponent;
var PanelElement = (function (_super) {
    __extends(PanelElement, _super);
    function PanelElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PanelElement.prototype, "numComponents", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return PanelElement;
}(base_1.BaseElement));
exports.PanelElement = PanelElement;
function PanelField(template) {
    components_1.FormioComponents.register('panel', PanelComponent, PanelElement, template.components.panel);
    return PanelElement;
}
exports.PanelField = PanelField;
