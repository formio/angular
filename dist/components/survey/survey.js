"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var SurveyComponent = (function (_super) {
    __extends(SurveyComponent, _super);
    function SurveyComponent() {
        _super.apply(this, arguments);
    }
    return SurveyComponent;
}(base_1.BaseComponent));
exports.SurveyComponent = SurveyComponent;
var SurveyElement = (function (_super) {
    __extends(SurveyElement, _super);
    function SurveyElement() {
        _super.apply(this, arguments);
    }
    SurveyElement.prototype.getValue = function (label, value) {
        this.valueObj[label] = value;
        return this.valueObj;
    };
    SurveyElement.prototype.ngOnInit = function () {
        this.valueObj = {};
    };
    return SurveyElement;
}(base_1.BaseElement));
exports.SurveyElement = SurveyElement;
function SurveyField(template) {
    components_1.FormioComponents.register('survey', SurveyComponent, SurveyElement, template.components.survey);
    return SurveyElement;
}
exports.SurveyField = SurveyField;
