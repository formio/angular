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
var formio_common_1 = require('./formio.common');
var FormioComponentsComponent = (function () {
    function FormioComponentsComponent() {
        this.render = new core_1.EventEmitter();
        this.renderCount = 0;
    }
    FormioComponentsComponent.prototype.onRender = function () {
        if (this.renderCount >= this.components.length) {
            return;
        }
        this.renderCount++;
        if (this.renderCount >= this.components.length) {
            this.render.emit(true);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FormioComponentsComponent.prototype, "components", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], FormioComponentsComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], FormioComponentsComponent.prototype, "submission", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponentsComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', formio_common_1.FormioEvents)
    ], FormioComponentsComponent.prototype, "events", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponentsComponent.prototype, "render", void 0);
    FormioComponentsComponent = __decorate([
        core_1.Component({
            selector: 'formio-components',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [])
    ], FormioComponentsComponent);
    return FormioComponentsComponent;
}());
exports.FormioComponentsComponent = FormioComponentsComponent;
