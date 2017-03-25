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
var _each = require('lodash/each');
var FormioResourceIndexComponent = (function () {
    function FormioResourceIndexComponent(service, route, router, config) {
        var _this = this;
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.gridQuery = {};
        if (this.config.parents && this.config.parents.length) {
            // Wait for the parents to load before loading this grid.
            this.service.onParents.subscribe(function (parents) {
                _each(parents, function (parent) {
                    _this.gridQuery['data.' + parent.name + '._id'] = parent.resource._id;
                });
                // Set the source to load the grid.
                _this.gridSrc = _this.service.formUrl;
            });
        }
        else if (this.service.formUrl) {
            this.gridSrc = this.service.formUrl;
        }
    }
    FormioResourceIndexComponent.prototype.onSelect = function (row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    };
    return FormioResourceIndexComponent;
}());
FormioResourceIndexComponent = __decorate([
    core_1.Component({
        template: '<formio-grid [src]="gridSrc" [query]="gridQuery" [onForm]="service.formLoaded" (select)="onSelect($event)" (error)="service.onError($event)"></formio-grid>' +
            '<button class="btn btn-primary" *ngIf="service.form" routerLink="new"><span class="glyphicon glyphicon-plus"></span> New {{ service.form.title }}</button>'
    }),
    __metadata("design:paramtypes", [resource_service_1.FormioResourceService,
        router_1.ActivatedRoute,
        router_1.Router,
        resource_config_1.FormioResourceConfig])
], FormioResourceIndexComponent);
exports.FormioResourceIndexComponent = FormioResourceIndexComponent;
