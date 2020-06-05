import { Routes } from '@angular/router';
import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view/view.component';
import { FormioResourceEditComponent } from './edit/edit.component';
import { FormioResourceDeleteComponent } from './delete/delete.component';
import { FormioResourceCreateComponent } from './create/create.component';
import { FormioResourceIndexComponent } from './index/index.component';
import { FormioResourceRouteConfig } from './resource.config';
export function FormioResourceRoutes(config?: FormioResourceRouteConfig): Routes {
  return [
    {
      path: '',
      component: config && config.index ? config.index : FormioResourceIndexComponent
    },
    {
      path: 'new',
      component: config && config.create ? config.create : FormioResourceCreateComponent
    },
    {
      path: ':id',
      component: config && config.resource ? config.resource : FormioResourceComponent,
      children: [
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full'
        },
        {
          path: 'view',
          component: config && config.view ? config.view : FormioResourceViewComponent
        },
        {
          path: 'edit',
          component: config && config.edit ? config.edit : FormioResourceEditComponent
        },
        {
          path: 'delete',
          component: config && config.delete ? config.delete : FormioResourceDeleteComponent
        }
      ]
    }
  ];
}
