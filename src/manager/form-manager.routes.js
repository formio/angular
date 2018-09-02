"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("./index/index.component");
var form_component_1 = require("./form/form.component");
var view_component_1 = require("./view/view.component");
var edit_component_1 = require("./edit/edit.component");
var delete_component_1 = require("./delete/delete.component");
var edit_component_2 = require("./submission/edit/edit.component");
var delete_component_2 = require("./submission/delete/delete.component");
var view_component_2 = require("./submission/view/view.component");
var index_component_2 = require("./submission/index/index.component");
var submission_component_1 = require("./submission/submission/submission.component");
function FormManagerRoutes(config) {
    config = config || {};
    return [
        {
            path: '',
            component: config.formIndex || index_component_1.FormManagerIndexComponent
        },
        {
            path: 'create',
            component: config.formCreate || edit_component_1.FormManagerEditComponent
        },
        {
            path: ':id',
            component: config.form || form_component_1.FormManagerFormComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config.formView || view_component_1.FormManagerViewComponent
                },
                {
                    path: 'edit',
                    component: config.formEdit || edit_component_1.FormManagerEditComponent
                },
                {
                    path: 'delete',
                    component: config.formDelete || delete_component_1.FormManagerDeleteComponent
                },
                {
                    path: 'submission',
                    component: config.submissionIndex || index_component_2.SubmissionIndexComponent,
                    children: [
                        {
                            path: ':id',
                            component: config.submission || submission_component_1.SubmissionComponent,
                            children: [
                                {
                                    path: 'view',
                                    component: config.submissionView || view_component_2.SubmissionViewComponent
                                },
                                {
                                    path: 'edit',
                                    component: config.submissionEdit || edit_component_2.SubmissionEditComponent
                                },
                                {
                                    path: 'delete',
                                    component: config.submissionDelete || delete_component_2.SubmissionDeleteComponent
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
exports.FormManagerRoutes = FormManagerRoutes;
