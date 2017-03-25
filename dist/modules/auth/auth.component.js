"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormioAuthComponent = (function () {
    function FormioAuthComponent() {
    }
    return FormioAuthComponent;
}());
FormioAuthComponent = __decorate([
    core_1.Component({
        template: '<div class="panel panel-default">' +
            '<div class="panel-heading" style="padding-bottom: 0; border-bottom: none;">' +
            '<ul class="nav nav-tabs" style="border-bottom: none;">' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="login">Login</a></li>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="register">Register</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="panel-body">' +
            '<div class="row">' +
            '<div class="col-lg-12">' +
            '<router-outlet></router-outlet>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-lg-12"></div>' +
            '</div>' +
            '</div>' +
            '</div>'
    })
], FormioAuthComponent);
exports.FormioAuthComponent = FormioAuthComponent;
