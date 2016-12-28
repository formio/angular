"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var components_1 = require('./components/components');
var base_1 = require('./components/base');
var formio_common_1 = require('./formio.common');
var FormioElement = (function () {
    function FormioElement(compiler) {
        this.compiler = compiler;
    }
    FormioElement.prototype.ngOnInit = function () {
        var _this = this;
        // Get the element.
        components_1.FormioComponents.element(this.component.settings.type, this.compiler).then(function (factory) {
            if (!_this.element) {
                return;
            }
            var cmpRef = _this.element.createComponent(factory);
            _this.component.label = _this.label;
            // Set the value.
            if ((_this.component.control instanceof forms_1.FormControl) &&
                _this.data &&
                _this.data.hasOwnProperty(_this.component.settings.key)) {
                var data = _this.data[_this.component.settings.key];
                if (data instanceof Array) {
                    _this.component.control.setValue(data[_this.component.index]);
                }
                else {
                    _this.component.control.setValue(data);
                }
            }
            cmpRef.instance.component = _this.component;
            cmpRef.instance.form = _this.form;
            cmpRef.instance.submission = _this.submission;
            cmpRef.instance.data = _this.data;
            cmpRef.instance.render = _this.render;
            cmpRef.instance.events = _this.events;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', base_1.BaseComponent)
    ], FormioElement.prototype, "component", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], FormioElement.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], FormioElement.prototype, "submission", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioElement.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioElement.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', formio_common_1.FormioEvents)
    ], FormioElement.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioElement.prototype, "render", void 0);
    __decorate([
        core_1.ViewChild('formioElement', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], FormioElement.prototype, "element", void 0);
    FormioElement = __decorate([
        core_1.Component({
            selector: 'formio-element',
            template: '<div #formioElement></div>'
        }), 
        __metadata('design:paramtypes', [core_1.Compiler])
    ], FormioElement);
    return FormioElement;
}());
exports.FormioElement = FormioElement;
