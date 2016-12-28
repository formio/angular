"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var ContentComponent = (function (_super) {
    __extends(ContentComponent, _super);
    function ContentComponent() {
        _super.apply(this, arguments);
    }
    return ContentComponent;
}(base_1.BaseComponent));
exports.ContentComponent = ContentComponent;
var ContentElement = (function (_super) {
    __extends(ContentElement, _super);
    function ContentElement() {
        _super.apply(this, arguments);
    }
    ContentElement.prototype.ngOnInit = function () {
        if (this.component.data[this.component.settings.key] != null) {
            this.element = this.component.data[this.component.settings.key];
        }
        else {
            this.element = this.component.settings.html;
        }
    };
    return ContentElement;
}(base_1.BaseElement));
exports.ContentElement = ContentElement;
function ContentField(template) {
    components_1.FormioComponents.register('content', ContentComponent, ContentElement, template.components.content);
    return ContentElement;
}
exports.ContentField = ContentField;
