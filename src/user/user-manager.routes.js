"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = require("../manager");
var index_component_1 = require("./index/index.component");
var abstract_component_1 = require("./abstract/abstract.component");
function UserManagerRoutes(config) {
    return [
        {
            path: '',
            component: config && config.formIndex ? config.formIndex : index_component_1.UserManagerIndexComponent
        },
        {
            path: ':category',
            component: config && config.form ? config.form : abstract_component_1.UserFormManagerFormComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config && config.formView ? config.formView : manager_1.FormManagerViewComponent
                },
                {
                    path: 'submission',
                    component: config && config.submissionIndex ? config.submissionIndex : manager_1.SubmissionIndexComponent
                },
                {
                    path: 'submission/:id',
                    component: config && config.submission ? config.submission : manager_1.SubmissionComponent,
                    children: [
                        {
                            path: '',
                            redirectTo: 'view',
                            pathMatch: 'full'
                        },
                        {
                            path: 'view',
                            component: config && config.submissionView ? config.submissionView : manager_1.SubmissionViewComponent
                        },
                        {
                            path: 'edit',
                            component: config && config.submissionEdit ? config.submissionEdit : manager_1.SubmissionEditComponent
                        },
                        {
                            path: 'delete',
                            component: config && config.submissionDelete ? config.submissionDelete : manager_1.SubmissionDeleteComponent
                        }
                    ]
                }
            ]
        }
    ];
}
exports.UserManagerRoutes = UserManagerRoutes;
