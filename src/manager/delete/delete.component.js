"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormManagerDeleteComponent = /** @class */ (function () {
    function FormManagerDeleteComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    FormManagerDeleteComponent.prototype.onDelete = function () {
        var _this = this;
        this.service.formio.deleteForm().then(function () {
            _this.router.navigate(['../../'], { relativeTo: _this.route });
        });
    };
    FormManagerDeleteComponent.prototype.onCancel = function () {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    };
    FormManagerDeleteComponent = __decorate([
        core_1.Component({
            templateUrl: './delete.component.html'
        })
    ], FormManagerDeleteComponent);
    return FormManagerDeleteComponent;
}());
exports.FormManagerDeleteComponent = FormManagerDeleteComponent;
