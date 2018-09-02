"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var formiojs_1 = require("formiojs");
var FormManagerService = /** @class */ (function () {
    function FormManagerService(appConfig, config) {
        this.appConfig = appConfig;
        this.config = config;
        if (this.appConfig && this.appConfig.appUrl) {
            formiojs_1.Formio.setBaseUrl(this.appConfig.apiUrl);
            formiojs_1.Formio.setProjectUrl(this.appConfig.appUrl);
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.formio = new formiojs_1.Formio(this.appConfig.appUrl);
    }
    FormManagerService.prototype.setForm = function (route) {
        var _this = this;
        route.params.subscribe(function (params) {
            _this.formio = new formiojs_1.Formio(_this.formio.formsUrl + "/" + params.id);
        });
    };
    FormManagerService.prototype.loadForm = function () {
        return this.formio.loadForm();
    };
    FormManagerService.prototype.setSubmission = function (route) {
        var _this = this;
        route.params.subscribe(function (params) {
            _this.formio = new formiojs_1.Formio(_this.formio.submissionsUrl + "/" + params.id);
        });
    };
    FormManagerService.prototype.loadForms = function () {
        return this.formio.loadForms({ params: {
                tags: this.config.tag
            } });
    };
    FormManagerService.prototype.createForm = function (form) {
        return this.formio.createform(form);
    };
    FormManagerService = __decorate([
        core_1.Injectable()
    ], FormManagerService);
    return FormManagerService;
}());
exports.FormManagerService = FormManagerService;
