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
var builder_1 = require("./builder");
var simple_1 = require("./simple");
var wizard_1 = require("./wizard");
var pdf_1 = require("./pdf");
var kitchen_1 = require("./kitchen");
var language_1 = require("./language");
var forms_component_1 = require("./forms.component");
exports.FormRoutes = [
    {
        path: '',
        component: forms_component_1.FormioFormsComponent,
        children: [
            {
                path: '',
                redirectTo: 'builder',
                pathMatch: 'full'
            },
            {
                path: 'builder',
                title: 'Form Builder',
                component: builder_1.BuilderComponent
            },
            {
                path: 'simple',
                title: 'Simple Form',
                component: simple_1.SimpleFormComponent
            },
            {
                path: 'wizard',
                title: 'Wizard Form',
                component: wizard_1.WizardFormComponent
            },
            {
                path: 'pdf',
                title: 'PDF Form',
                component: pdf_1.PDFFormComponent
            },
            {
                path: 'language',
                title: 'Multi-Language',
                component: language_1.LanguageFormComponent
            },
            {
                path: 'kitchen',
                title: 'Kitchen Sink',
                component: kitchen_1.KitchenSinkFormComponent
            }
        ]
    }
];
var FormioFormsModule = /** @class */ (function () {
    function FormioFormsModule() {
    }
    FormioFormsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, dist_1.FormioModule, router_1.RouterModule.forChild(exports.FormRoutes)],
            declarations: [
                forms_component_1.FormioFormsComponent,
                simple_1.SimpleFormComponent,
                builder_1.BuilderComponent,
                wizard_1.WizardFormComponent,
                language_1.LanguageFormComponent,
                pdf_1.PDFFormComponent,
                kitchen_1.KitchenSinkFormComponent
            ],
            bootstrap: [forms_component_1.FormioFormsComponent]
        })
    ], FormioFormsModule);
    return FormioFormsModule;
}());
exports.FormioFormsModule = FormioFormsModule;
