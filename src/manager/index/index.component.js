"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormManagerIndexComponent = /** @class */ (function () {
    function FormManagerIndexComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    FormManagerIndexComponent.prototype.onAction = function (action) {
        this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
    };
    FormManagerIndexComponent.prototype.onSelect = function (row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    };
    FormManagerIndexComponent.prototype.onCreateItem = function () {
        this.router.navigate(['create'], { relativeTo: this.route });
    };
    FormManagerIndexComponent = __decorate([
        core_1.Component({
            templateUrl: './index.component.html'
        })
    ], FormManagerIndexComponent);
    return FormManagerIndexComponent;
}());
exports.FormManagerIndexComponent = FormManagerIndexComponent;
