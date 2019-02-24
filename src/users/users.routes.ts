import { Routes } from '@angular/router';
import { UsersCreateComponent} from './create/create.component';
import {UsersIndexComponent} from './index/index.component';
import {FormioUsersRouteConfig} from './users.config';
import {FormioUsersViewComponent} from './view/view.component';
import {FormioUsersEditComponent} from './edit/edit.component';
import {FormioUsersDeleteComponent} from './delete/delete.component';
import {FormioUsersComponent} from './users.component';
import {FormioUsersIndexComponent} from './forms/index.component';
export function UsersRoutes(config?: FormioUsersRouteConfig): Routes {
  return [
    {
      path: '',
      component: config && config.view ? config.view : FormioUsersIndexComponent
    },
    {
      path: ':name',
      component: config && config.view ? config.view : UsersIndexComponent,
      pathMatch: 'full'
    },
    {
      path: ':name/new',
      component: config && config.create ? config.create : UsersCreateComponent
    },
    {
      path: ':name/:id',
      component: config && config.index ? config.index : FormioUsersComponent,
      children: [
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full'
        },
        {
          path: 'view',
          component: config && config.view ? config.view : FormioUsersViewComponent
        },
        {
          path: 'edit',
          component: config && config.edit ? config.edit : FormioUsersEditComponent
        },
        {
          path: 'delete',
          component: config && config.delete ? config.delete : FormioUsersDeleteComponent
        }
      ]
    },
    // {
    //   path: ':id',
    //   component: config && config.resource ? config.resource : FormioResourceComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: 'view',
    //       pathMatch: 'full'
    //     },
    //     {
    //       path: 'view',
    //       component: config && config.view ? config.view : FormioResourceViewComponent
    //     },
    //     {
    //       path: 'edit',
    //       component: config && config.edit ? config.edit : FormioResourceEditComponent
    //     },
    //     {
    //       path: 'delete',
    //       component: config && config.delete ? config.delete : FormioResourceDeleteComponent
    //     }
    //   ]
    // }
  ];
}
