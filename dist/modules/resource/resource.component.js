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
var FormioResourceComponent = (function () {
    function FormioResourceComponent(service, route) {
        this.service = service;
        this.route = route;
        this.service.loadResource(this.route);
    }
    return FormioResourceComponent;
}());
FormioResourceComponent = __decorate([
    core_1.Component({
        styles: [
            'ul.nav.nav-tabs { margin-bottom: 20px; }',
            '.resource-back-icon { font-size: 1.2em; padding: 0.6em; }'
        ],
        template: '<ul class="nav nav-tabs">' +
            '<a routerLink="../" class="pull-left"><span class="glyphicon glyphicon-chevron-left resource-back-icon"></span></a>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="view">View</a></li>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="edit">Edit</a></li>' +
            '<li role="presentation pull-right" routerLinkActive="active"><a routerLink="delete"><span class="glyphicon glyphicon-trash"></span></a></li>' +
            '</ul>' +
            '<formio-loader></formio-loader>' +
            '<router-outlet></router-outlet>'
    }),
    __metadata("design:paramtypes", [resource_service_1.FormioResourceService,
        router_1.ActivatedRoute])
], FormioResourceComponent);
exports.FormioResourceComponent = FormioResourceComponent;
