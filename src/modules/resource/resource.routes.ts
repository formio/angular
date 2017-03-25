import { Routes } from '@angular/router';
import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view.component';
import { FormioResourceEditComponent } from './edit.component';
import { FormioResourceDeleteComponent } from './delete.component';
import { FormioResourceCreateComponent } from './create.component';
import { FormioResourceIndexComponent } from './index.component';

/**
 * The routes used to define a resource.
 *
 * @param config
 * @constructor
 */
export function FormioResourceRoutes(config?: any): Routes {
    config = config || {};
    return [
        {
            path: '',
            component: config.index || FormioResourceIndexComponent
        },
        {
            path: 'new',
            component: config.create || FormioResourceCreateComponent
        },
        {
            path: ':id',
            component: config.resource || FormioResourceComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config.view || FormioResourceViewComponent
                },
                {
                    path: 'edit',
                    component: config.edit || FormioResourceEditComponent
                },
                {
                    path: 'delete',
                    component: config.delete || FormioResourceDeleteComponent
                }
            ]
        }
    ];
};
