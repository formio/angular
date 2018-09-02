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
var forms_1 = require("@angular/forms");
var formio_module_1 = require("../formio.module");
var formio_loader_1 = require("../components/loader/formio.loader");
var formio_alerts_1 = require("../components/alerts/formio.alerts");
var grid_component_1 = require("./grid.component");
var pagination_1 = require("ngx-bootstrap/pagination");
var FormGridHeader_component_1 = require("./form/FormGridHeader.component");
var FormGridBody_component_1 = require("./form/FormGridBody.component");
var FormGridFooter_component_1 = require("./form/FormGridFooter.component");
var SubmissionGridHeader_component_1 = require("./submission/SubmissionGridHeader.component");
var SubmissionGridBody_component_1 = require("./submission/SubmissionGridBody.component");
var SubmissionGridFooter_component_1 = require("./submission/SubmissionGridFooter.component");
var FormioGrid = /** @class */ (function () {
    function FormioGrid() {
    }
    FormioGrid = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                formio_module_1.FormioModule,
                pagination_1.PaginationModule.forRoot()
            ],
            declarations: [
                grid_component_1.FormioGridComponent,
                FormGridHeader_component_1.FormGridHeaderComponent,
                FormGridBody_component_1.FormGridBodyComponent,
                FormGridFooter_component_1.FormGridFooterComponent,
                SubmissionGridHeader_component_1.SubmissionGridHeaderComponent,
                SubmissionGridBody_component_1.SubmissionGridBodyComponent,
                SubmissionGridFooter_component_1.SubmissionGridFooterComponent
            ],
            exports: [
                grid_component_1.FormioGridComponent
            ],
            entryComponents: [
                FormGridHeader_component_1.FormGridHeaderComponent,
                FormGridBody_component_1.FormGridBodyComponent,
                FormGridFooter_component_1.FormGridFooterComponent,
                SubmissionGridHeader_component_1.SubmissionGridHeaderComponent,
                SubmissionGridBody_component_1.SubmissionGridBodyComponent,
                SubmissionGridFooter_component_1.SubmissionGridFooterComponent
            ],
            providers: [
                formio_loader_1.FormioLoader,
                formio_alerts_1.FormioAlerts
            ]
        })
    ], FormioGrid);
    return FormioGrid;
}());
exports.FormioGrid = FormioGrid;
