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
var resource_config_1 = require("./resource.config");
var FormioResourceCreateComponent = (function () {
    function FormioResourceCreateComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
    }
    FormioResourceCreateComponent.prototype.onSubmit = function (submission) {
        var _this = this;
        this.service.save(submission).then(function () {
            _this.router.navigate(['../', _this.service.resource._id, 'view'], { relativeTo: _this.route });
        });
    };
    return FormioResourceCreateComponent;
}());
FormioResourceCreateComponent = __decorate([
    core_1.Component({
        styles: ['.back-button { font-size: 0.8em; }'],
        template: '<h3 *ngIf="service.form" style="margin-top:0;"><a routerLink="../" class="back-button"><span class="glyphicon glyphicon-chevron-left"></span></a> | New {{ service.form.title }}</h3>' +
            '<formio-loader></formio-loader>' +
            '<formio [form]="service.form" [submission]="service.resource" [refresh]="service.refresh" [hideComponents]="config.parents" (submit)="onSubmit($event)"></formio>'
    }),
    __metadata("design:paramtypes", [resource_service_1.FormioResourceService,
        router_1.ActivatedRoute,
        router_1.Router,
        resource_config_1.FormioResourceConfig])
], FormioResourceCreateComponent);
exports.FormioResourceCreateComponent = FormioResourceCreateComponent;
