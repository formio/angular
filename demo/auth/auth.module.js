"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var auth_1 = require("../../dist/auth");
var auth_component_1 = require("./auth.component");
exports.authRoutes = auth_1.FormioAuthRoutes({
    auth: auth_component_1.AuthComponent
});
var AuthDemoModule = /** @class */ (function () {
    function AuthDemoModule() {
    }
    AuthDemoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                auth_1.FormioAuth,
                router_1.RouterModule.forChild(exports.authRoutes)
            ],
            declarations: [
                auth_component_1.AuthComponent
            ]
        })
    ], AuthDemoModule);
    return AuthDemoModule;
}());
exports.AuthDemoModule = AuthDemoModule;
