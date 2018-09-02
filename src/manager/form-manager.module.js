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
var forms_1 = require("@angular/forms");
var formio_module_1 = require("../formio.module");
var grid_module_1 = require("../grid/grid.module");
var index_component_1 = require("./index/index.component");
var form_component_1 = require("./form/form.component");
var view_component_1 = require("./view/view.component");
var edit_component_1 = require("./edit/edit.component");
var delete_component_1 = require("./delete/delete.component");
var submission_component_1 = require("./submission/submission/submission.component");
var edit_component_2 = require("./submission/edit/edit.component");
var delete_component_2 = require("./submission/delete/delete.component");
var view_component_2 = require("./submission/view/view.component");
var index_component_2 = require("./submission/index/index.component");
var form_manager_routes_1 = require("./form-manager.routes");
var pagination_1 = require("ngx-bootstrap/pagination");
var formio_utils_1 = require("../formio.utils");
var FormManagerModule = /** @class */ (function () {
    function FormManagerModule() {
    }
    FormManagerModule_1 = FormManagerModule;
    FormManagerModule.forChild = function (config) {
        return formio_utils_1.extendRouter(FormManagerModule_1, config, form_manager_routes_1.FormManagerRoutes);
    };
    FormManagerModule.forRoot = function (config) {
        return formio_utils_1.extendRouter(FormManagerModule_1, config, form_manager_routes_1.FormManagerRoutes);
    };
    var FormManagerModule_1;
    FormManagerModule = FormManagerModule_1 = __decorate([
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
                index_component_1.FormManagerIndexComponent,
                form_component_1.FormManagerFormComponent,
                view_component_1.FormManagerViewComponent,
                edit_component_1.FormManagerEditComponent,
                delete_component_1.FormManagerDeleteComponent,
                submission_component_1.SubmissionComponent,
                edit_component_2.SubmissionEditComponent,
                delete_component_2.SubmissionDeleteComponent,
                view_component_2.SubmissionViewComponent,
                index_component_2.SubmissionIndexComponent
            ]
        })
    ], FormManagerModule);
    return FormManagerModule;
}());
exports.FormManagerModule = FormManagerModule;
