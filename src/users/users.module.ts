import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '../formio.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {extendRouter} from '../formio.utils';
import {UsersRoutes} from './users.routes';
import { FormioGrid } from '../grid/grid.module';
import {UsersIndexComponent} from './index/index.component';
import {UsersCreateComponent} from './create/create.component';
import {FormioUsersRouteConfig} from './users.config';
import {FormioUsersEditComponent} from './edit/edit.component';
import {FormioUsersViewComponent} from './view/view.component';
import {FormioUsersDeleteComponent} from './delete/delete.component';
import {FormioUsersComponent} from './users.component';
import {FormioUsersIndexComponent} from './forms/index.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule,
    FormsModule,
    FormioGrid,
    NgbModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    UsersIndexComponent,
    UsersCreateComponent,
    FormioUsersEditComponent,
    FormioUsersViewComponent,
    FormioUsersDeleteComponent,
    FormioUsersComponent,
    FormioUsersIndexComponent
  ]
})
export class FormioUsersModule {
  static forChild(config?: FormioUsersRouteConfig): any {
    return extendRouter(FormioUsersModule, config, UsersRoutes);
  }
  static forRoot(config?: FormioUsersRouteConfig): any {
    return extendRouter(FormioUsersModule, config, UsersRoutes);
  }
}
