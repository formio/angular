import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormioModule } from '../formio.module';
import { FormioAlerts } from '../components/alerts/formio.alerts';
import { FormioGrid } from '../grid/grid.module';
import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view/view.component';
import { FormioResourceEditComponent } from './edit/edit.component';
import { FormioResourceDeleteComponent } from './delete/delete.component';
import { FormioResourceCreateComponent } from './create/create.component';
import { FormioResourceIndexComponent } from './index/index.component';
import { FormioResourceRouteConfig } from './resource.config';
import { FormioResourceRoutes } from './resource.routes';
import { extendRouter } from '../formio.utils';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid,
    RouterModule
  ],
  declarations: [
    FormioResourceComponent,
    FormioResourceCreateComponent,
    FormioResourceIndexComponent,
    FormioResourceViewComponent,
    FormioResourceEditComponent,
    FormioResourceDeleteComponent
  ],
  providers: [
    FormioAlerts
  ]
})
export class FormioResource {
  static forChild(config?: FormioResourceRouteConfig): any {
    return extendRouter(FormioResource, config, FormioResourceRoutes);
  }
  static forRoot(config?: FormioResourceRouteConfig): any {
    return extendRouter(FormioResource, config, FormioResourceRoutes);
  }
}
