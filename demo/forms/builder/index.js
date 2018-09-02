"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var prismjs_1 = require("prismjs");
var BuilderComponent = /** @class */ (function () {
    function BuilderComponent() {
        this.form = {
            components: []
        };
    }
    BuilderComponent.prototype.onChange = function (event) {
        this.jsonElement.nativeElement.innerHTML = '';
        this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    };
    BuilderComponent.prototype.ngAfterViewInit = function () {
        var formattedCode = prismjs_1.default.highlight("import { Component, ElementRef, ViewChild } from '@angular/core';\n@Component({\n  template: require('./builder.html')\n})\nexport class BuilderComponent {\n  @ViewChild('json') jsonElement?: ElementRef;\n  public form: Object = {components: []};\n  onChange(event) {\n    console.log(event.form);\n  }\n}", prismjs_1.default.languages.javascript, 'javascript');
        this.codeElement.nativeElement.innerHTML = formattedCode;
    };
    __decorate([
        core_1.ViewChild('json')
    ], BuilderComponent.prototype, "jsonElement", void 0);
    __decorate([
        core_1.ViewChild('code')
    ], BuilderComponent.prototype, "codeElement", void 0);
    BuilderComponent = __decorate([
        core_1.Component({
            template: require('./builder.html')
        })
    ], BuilderComponent);
    return BuilderComponent;
}());
exports.BuilderComponent = BuilderComponent;
