"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var formio_module_1 = require("../formio.module");
var grid_module_1 = require("../grid/grid.module");
var resource_component_1 = require("./resource.component");
var view_component_1 = require("./view/view.component");
var edit_component_1 = require("./edit/edit.component");
var delete_component_1 = require("./delete/delete.component");
var create_component_1 = require("./create/create.component");
var index_component_1 = require("./index/index.component");
var resource_routes_1 = require("./resource.routes");
var formio_utils_1 = require("../formio.utils");
var FormioResource = /** @class */ (function () {
    function FormioResource() {
    }
    FormioResource_1 = FormioResource;
    FormioResource.forChild = function (config) {
        return formio_utils_1.extendRouter(FormioResource_1, config, resource_routes_1.FormioResourceRoutes);
    };
    FormioResource.forRoot = function (config) {
        return formio_utils_1.extendRouter(FormioResource_1, config, resource_routes_1.FormioResourceRoutes);
    };
    var FormioResource_1;
    FormioResource = FormioResource_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                formio_module_1.FormioModule,
                grid_module_1.FormioGrid,
                router_1.RouterModule
            ],
            declarations: [
                resource_component_1.FormioResourceComponent,
                create_component_1.FormioResourceCreateComponent,
                index_component_1.FormioResourceIndexComponent,
                view_component_1.FormioResourceViewComponent,
                edit_component_1.FormioResourceEditComponent,
                delete_component_1.FormioResourceDeleteComponent
            ]
        })
    ], FormioResource);
    return FormioResource;
}());
exports.FormioResource = FormioResource;
