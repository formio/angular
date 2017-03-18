import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule }   from '../../index';
import { FormioGrid } from '../grid';
import { RouterModule } from '@angular/router';
import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view.component';
import { FormioResourceEditComponent } from './edit.component';
import { FormioResourceDeleteComponent } from './delete.component';
import { FormioResourceCreateComponent } from './create.component';
import { FormioResourceIndexComponent } from './index.component';

@NgModule({
    imports: [
        CommonModule,
        FormioModule,
        FormioGrid,
        RouterModule.forChild([])
    ],
    declarations: [
        FormioResourceComponent,
        FormioResourceCreateComponent,
        FormioResourceIndexComponent,
        FormioResourceViewComponent,
        FormioResourceEditComponent,
        FormioResourceDeleteComponent
    ]
})
export class FormioResource {}

export { FormioResourceRoutes } from './resource.routes';
export { FormioResourceConfig, FormioResources } from './resource.config';
export { FormioResourceComponent } from './resource.component';
export { FormioResourceViewComponent } from './view.component';
export { FormioResourceEditComponent } from './edit.component';
export { FormioResourceDeleteComponent } from './delete.component';
export { FormioResourceCreateComponent } from './create.component';
export { FormioResourceIndexComponent } from './index.component';
export { FormioResourceService } from './resource.service';
