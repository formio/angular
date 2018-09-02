"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GridHeaderComponent = /** @class */ (function () {
    function GridHeaderComponent() {
        this.headers = [];
        this.sort = new core_1.EventEmitter();
    }
    Object.defineProperty(GridHeaderComponent.prototype, "numHeaders", {
        get: function () {
            return this.headers.length;
        },
        enumerable: true,
        configurable: true
    });
    GridHeaderComponent.prototype.load = function (formio, query) {
        return Promise.resolve([]);
    };
    __decorate([
        core_1.Output()
    ], GridHeaderComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(core_1.TemplateRef)
    ], GridHeaderComponent.prototype, "template", void 0);
    return GridHeaderComponent;
}());
exports.GridHeaderComponent = GridHeaderComponent;
