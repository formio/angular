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
var formio_module_1 = require("../formio.module");
var auth_component_1 = require("./auth.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var auth_routes_1 = require("./auth.routes");
var formio_utils_1 = require("../formio.utils");
var FormioAuth = /** @class */ (function () {
    function FormioAuth() {
    }
    FormioAuth_1 = FormioAuth;
    FormioAuth.forRoot = function (config) {
        return formio_utils_1.extendRouter(FormioAuth_1, config, auth_routes_1.FormioAuthRoutes);
    };
    FormioAuth.forChild = function (config) {
        return formio_utils_1.extendRouter(FormioAuth_1, config, auth_routes_1.FormioAuthRoutes);
    };
    var FormioAuth_1;
    FormioAuth = FormioAuth_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                formio_module_1.FormioModule,
                router_1.RouterModule
            ],
            declarations: [
                auth_component_1.FormioAuthComponent,
                login_component_1.FormioAuthLoginComponent,
                register_component_1.FormioAuthRegisterComponent
            ]
        })
    ], FormioAuth);
    return FormioAuth;
}());
exports.FormioAuth = FormioAuth;
