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
var index_1 = require("../../index");
var grid_component_1 = require("./grid.component");
var pagination_1 = require("ng2-bootstrap/pagination");
var FormioGrid = (function () {
    function FormioGrid() {
    }
    return FormioGrid;
}());
FormioGrid = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            index_1.FormioModule,
            pagination_1.PaginationModule.forRoot()
        ],
        declarations: [
            grid_component_1.FormioGridComponent
        ],
        exports: [
            grid_component_1.FormioGridComponent
        ]
    })
], FormioGrid);
exports.FormioGrid = FormioGrid;
