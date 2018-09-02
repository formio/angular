"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GridHeaderComponent_1 = require("../GridHeaderComponent");
var FormGridHeaderComponent = /** @class */ (function (_super) {
    __extends(FormGridHeaderComponent, _super);
    function FormGridHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormGridHeaderComponent.prototype.load = function (formio) {
        this.header = {
            label: 'Title',
            key: 'title',
            sort: 'asc'
        };
        this.headers = [this.header];
        return Promise.resolve(this.headers);
    };
    Object.defineProperty(FormGridHeaderComponent.prototype, "numHeaders", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    FormGridHeaderComponent = __decorate([
        core_1.Component({
            selector: 'form-grid-header',
            templateUrl: './FormGridHeader.component.html'
        })
    ], FormGridHeaderComponent);
    return FormGridHeaderComponent;
}(GridHeaderComponent_1.GridHeaderComponent));
exports.FormGridHeaderComponent = FormGridHeaderComponent;
