"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var HtmlComponent = (function (_super) {
    __extends(HtmlComponent, _super);
    function HtmlComponent() {
        _super.apply(this, arguments);
    }
    return HtmlComponent;
}(base_1.BaseComponent));
exports.HtmlComponent = HtmlComponent;
var HtmlElement = (function (_super) {
    __extends(HtmlElement, _super);
    function HtmlElement() {
        _super.apply(this, arguments);
    }
    HtmlElement.prototype.ngOnInit = function () {
        if (this.component.data[this.component.settings.key] != null) {
            this.element = this.component.data[this.component.settings.key];
        }
        else {
            var attributes_1 = '';
            this.component.settings.attrs.forEach(function (item) {
                attributes_1 = attributes_1 + item.attr + "=" + item.value + " ";
            });
            this.element = "<" + this.component.settings.tag + " class='" + this.component.settings.className + "' " + attributes_1 + ">" + this.component.settings.content + "</" + this.component.settings.tag + ">";
        }
    };
    return HtmlElement;
}(base_1.BaseElement));
exports.HtmlElement = HtmlElement;
function HtmlField(template) {
    components_1.FormioComponents.register('htmlelement', HtmlComponent, HtmlElement, template.components.html);
    return HtmlElement;
}
exports.HtmlField = HtmlField;
