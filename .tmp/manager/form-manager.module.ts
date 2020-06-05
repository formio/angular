import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '../formio.module';
import { FormioGrid } from '../grid/grid.module';
import { FormManagerIndexComponent } from './index/index.component';
import { FormManagerCreateComponent } from './create/create.component';
import { FormManagerFormComponent } from './form/form.component';
import { FormManagerViewComponent } from './view/view.component';
import { FormManagerEditComponent } from './edit/edit.component';
import { FormManagerDeleteComponent } from './delete/delete.component';
import { SubmissionComponent } from './submission/submission/submission.component';
import { SubmissionEditComponent } from './submission/edit/edit.component';
import { SubmissionDeleteComponent } from './submission/delete/delete.component';
import { SubmissionViewComponent } from './submission/view/view.component';
import { SubmissionIndexComponent } from './submission/index/index.component';
import { FormManagerRouteConfig } from './form-manager.config';
import { FormManagerRoutes } from './form-manager.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { extendRouter } from '../formio.utils';
@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule,
    FormsModule,
    FormioGrid,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    FormManagerIndexComponent,
    FormManagerCreateComponent,
    FormManagerFormComponent,
    FormManagerViewComponent,
    FormManagerEditComponent,
    FormManagerDeleteComponent,
    SubmissionComponent,
    SubmissionEditComponent,
    SubmissionDeleteComponent,
    SubmissionViewComponent,
    SubmissionIndexComponent
  ]
})
export class FormManagerModule {
  static forChild(config?: FormManagerRouteConfig): any {
    return extendRouter(FormManagerModule, config, FormManagerRoutes);
  }
  static forRoot(config?: FormManagerRouteConfig): any {
    return extendRouter(FormManagerModule, config, FormManagerRoutes);
  }
}
