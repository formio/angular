"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../manager/index/index.component.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var formio_module_1 = require("../formio.module");
var grid_module_1 = require("../grid/grid.module");
var pagination_1 = require("ngx-bootstrap/pagination");
var formio_utils_1 = require("../formio.utils");
var user_manager_routes_1 = require("./user-manager.routes");
var manager_1 = require("../manager");
var index_component_1 = require("./index/index.component");
var UserManagerModule = /** @class */ (function () {
    function UserManagerModule() {
    }
    UserManagerModule_1 = UserManagerModule;
    UserManagerModule.forChild = function (config) {
        return formio_utils_1.extendRouter(UserManagerModule_1, config, user_manager_routes_1.UserManagerRoutes);
    };
    UserManagerModule.forRoot = function (config) {
        return formio_utils_1.extendRouter(UserManagerModule_1, config, user_manager_routes_1.UserManagerRoutes);
    };
    UserManagerModule = UserManagerModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                formio_module_1.FormioModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                grid_module_1.FormioGrid,
                pagination_1.PaginationModule.forRoot()
            ],
            declarations: [
                manager_1.FormManagerIndexComponent,
                manager_1.FormManagerCreateComponent,
                manager_1.FormManagerFormComponent,
                manager_1.FormManagerViewComponent,
                manager_1.FormManagerEditComponent,
                index_component_1.UserManagerIndexComponent,
                manager_1.FormManagerDeleteComponent,
                manager_1.SubmissionComponent,
                manager_1.SubmissionEditComponent,
                manager_1.SubmissionDeleteComponent,
                manager_1.SubmissionViewComponent,
                manager_1.SubmissionIndexComponent
            ]
        })
    ], UserManagerModule);
    return UserManagerModule;
    var UserManagerModule_1;
}());
exports.UserManagerModule = UserManagerModule;
