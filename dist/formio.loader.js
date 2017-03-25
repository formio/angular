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
var FormioLoader = (function () {
    function FormioLoader() {
        this.loading = true;
    }
    return FormioLoader;
}());
FormioLoader = __decorate([
    core_1.Injectable()
], FormioLoader);
exports.FormioLoader = FormioLoader;
var FormioLoaderComponent = (function () {
    function FormioLoaderComponent(loader) {
        this.loader = loader;
    }
    return FormioLoaderComponent;
}());
FormioLoaderComponent = __decorate([
    core_1.Component({
        selector: 'formio-loader',
        styles: [
            '.formio-loader-wrapper { position:absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; }',
            '.formio-loader {position:absolute;left: 50%;top: 50%;margin-left: -30px;margin-top: -30px;z-index: 10000;display: inline-block;border: 6px solid #f3f3f3;border-top: 6px solid #3498db;border-radius: 50%;width: 60px;height: 60px;animation: spin 2s linear infinite;}',
            '@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}'
        ],
        template: '<div *ngIf="loader.loading" style="position:relative;height:200px"><div class="formio-loader-wrapper"><div class="formio-loader"></div></div></div>'
    }),
    __metadata("design:paramtypes", [FormioLoader])
], FormioLoaderComponent);
exports.FormioLoaderComponent = FormioLoaderComponent;
