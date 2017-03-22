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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var resource_service_1 = require("./resource.service");
var FormioResourceDeleteComponent = (function () {
    function FormioResourceDeleteComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    FormioResourceDeleteComponent.prototype.onDelete = function () {
        var _this = this;
        this.service.remove().then(function () {
            _this.router.navigate(['../../'], { relativeTo: _this.route });
        });
    };
    FormioResourceDeleteComponent.prototype.onCancel = function () {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    };
    return FormioResourceDeleteComponent;
}());
FormioResourceDeleteComponent = __decorate([
    core_1.Component({
        template: '<h3>Are you sure you wish to delete this record?</h3>' +
            '<div class="btn-toolbar">' +
            '<button (click)="onDelete()" class="btn btn-danger">Yes</button>' +
            '<button (click)="onCancel()" class="btn btn-danger">No</button>' +
            '</div>'
    }),
    __metadata("design:paramtypes", [resource_service_1.FormioResourceService,
        router_1.ActivatedRoute,
        router_1.Router])
], FormioResourceDeleteComponent);
exports.FormioResourceDeleteComponent = FormioResourceDeleteComponent;
