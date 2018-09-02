"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resource_component_1 = require("./resource.component");
var view_component_1 = require("./view/view.component");
var edit_component_1 = require("./edit/edit.component");
var delete_component_1 = require("./delete/delete.component");
var create_component_1 = require("./create/create.component");
var index_component_1 = require("./index/index.component");
/**
 * The routes used to define a resource.
 */
function FormioResourceRoutes(config) {
    config = config || {};
    return [
        {
            path: '',
            component: config.index || index_component_1.FormioResourceIndexComponent
        },
        {
            path: 'new',
            component: config.create || create_component_1.FormioResourceCreateComponent
        },
        {
            path: ':id',
            component: config.resource || resource_component_1.FormioResourceComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config.view || view_component_1.FormioResourceViewComponent
                },
                {
                    path: 'edit',
                    component: config.edit || edit_component_1.FormioResourceEditComponent
                },
                {
                    path: 'delete',
                    component: config.delete || delete_component_1.FormioResourceDeleteComponent
                }
            ]
        }
    ];
}
exports.FormioResourceRoutes = FormioResourceRoutes;
