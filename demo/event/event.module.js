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
var dist_1 = require("../../dist");
var grid_1 = require("../../dist/grid");
var resource_1 = require("../../dist/resource");
var config_1 = require("../config");
var event_index_1 = require("./event.index");
exports.eventRoutes = resource_1.FormioResourceRoutes({
    index: event_index_1.EventIndexComponent
});
var EventModule = /** @class */ (function () {
    function EventModule() {
    }
    EventModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                grid_1.FormioGrid,
                resource_1.FormioResource,
                router_1.RouterModule.forChild(exports.eventRoutes)
            ],
            declarations: [
                event_index_1.EventIndexComponent
            ],
            providers: [
                resource_1.FormioResourceService,
                { provide: dist_1.FormioAppConfig, useValue: config_1.AppConfig },
                { provide: resource_1.FormioResourceConfig, useValue: {
                        name: 'event',
                        form: 'event'
                    } }
            ]
        })
    ], EventModule);
    return EventModule;
}());
exports.EventModule = EventModule;
