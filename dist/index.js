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
var formio_component_1 = require("./formio.component");
var formio_alerts_1 = require("./formio.alerts");
var formio_loader_1 = require("./formio.loader");
var FormioModule = (function () {
    function FormioModule() {
    }
    return FormioModule;
}());
FormioModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            formio_component_1.FormioComponent,
            formio_loader_1.FormioLoaderComponent,
            formio_alerts_1.FormioAlertsComponent
        ],
        exports: [
            formio_component_1.FormioComponent,
            formio_loader_1.FormioLoaderComponent,
            formio_alerts_1.FormioAlertsComponent
        ],
        providers: [
            formio_loader_1.FormioLoader,
            formio_alerts_1.FormioAlerts
        ]
    })
], FormioModule);
exports.FormioModule = FormioModule;
var formio_config_1 = require("./formio.config");
exports.FormioAppConfig = formio_config_1.FormioAppConfig;
var formio_loader_2 = require("./formio.loader");
exports.FormioLoader = formio_loader_2.FormioLoader;
