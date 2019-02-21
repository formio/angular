///<reference path="../manager/index/index.component.ts"/>
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '../formio.module';
import { FormioGrid } from '../grid/grid.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { extendRouter } from '../formio.utils';
import {UserManagerRouteConfig} from './user-manager.config';
import {UserManagerRoutes} from './user-manager.routes';
import {
  FormManagerCreateComponent,
  FormManagerDeleteComponent,
  FormManagerEditComponent,
  FormManagerFormComponent,
  FormManagerIndexComponent,
  FormManagerViewComponent,
  SubmissionComponent,
  SubmissionDeleteComponent,
  SubmissionEditComponent,
  SubmissionIndexComponent,
  SubmissionViewComponent
} from '../manager';
import {UserManagerIndexComponent} from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule,
    FormsModule,
    FormioGrid,
    PaginationModule.forRoot()
  ],
  declarations: [
    FormManagerIndexComponent,
    FormManagerCreateComponent,
    FormManagerFormComponent,
    FormManagerViewComponent,
    FormManagerEditComponent,
    UserManagerIndexComponent,
    FormManagerDeleteComponent,
    SubmissionComponent,
    SubmissionEditComponent,
    SubmissionDeleteComponent,
    SubmissionViewComponent,
    SubmissionIndexComponent
  ]
})
export class UserManagerModule {
  static forChild(config?: UserManagerRouteConfig): any {
    return extendRouter(UserManagerModule, config, UserManagerRoutes);
  }
  static forRoot(config?: UserManagerRouteConfig): any {
    return extendRouter(UserManagerModule, config, UserManagerRoutes);
  }
}
