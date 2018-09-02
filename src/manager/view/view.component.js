"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormManagerViewComponent = /** @class */ (function () {
    function FormManagerViewComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    FormManagerViewComponent.prototype.onSubmit = function (submission) {
        this.router.navigate(['../', 'submission', submission._id], { relativeTo: this.route });
    };
    FormManagerViewComponent = __decorate([
        core_1.Component({
            templateUrl: './view.component.html'
        })
    ], FormManagerViewComponent);
    return FormManagerViewComponent;
}());
exports.FormManagerViewComponent = FormManagerViewComponent;
