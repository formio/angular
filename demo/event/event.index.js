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
var resource_1 = require("../../dist/resource");
/* tslint:disable */
var EventIndexComponent = /** @class */ (function (_super) {
    __extends(EventIndexComponent, _super);
    function EventIndexComponent(service, route, router, config) {
        var _this = _super.call(this, service, route, router, config) || this;
        _this.service = service;
        _this.route = route;
        _this.router = router;
        _this.config = config;
        return _this;
    }
    EventIndexComponent = __decorate([
        core_1.Component({
            template: require('./event.index.html') +
                '<formio-grid [src]="gridSrc" [query]="gridQuery" [onForm]="service.formLoaded" (select)="onSelect($event)" (error)="service.onError($event)"></formio-grid>' +
                '<button class="btn btn-primary" *ngIf="service.form" routerLink="new"><span class="glyphicon glyphicon-plus"></span> New {{ service.form.title }}</button>'
        })
        /* tslint:enable */
    ], EventIndexComponent);
    return EventIndexComponent;
}(resource_1.FormioResourceIndexComponent));
exports.EventIndexComponent = EventIndexComponent;
