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
var FormioEvents = (function () {
    function FormioEvents() {
        this.onBeforeSubmit = new core_1.EventEmitter(true);
        this.onSubmit = new core_1.EventEmitter();
        this.onInvalid = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this.onRender = new core_1.EventEmitter();
        this.errors = [];
        this.alerts = [];
    }
    FormioEvents = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FormioEvents);
    return FormioEvents;
}());
exports.FormioEvents = FormioEvents;
//# sourceMappingURL=formio.events.js.map