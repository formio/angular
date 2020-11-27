import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormioModule } from 'angular-formio';
import { FormioAlerts } from 'angular-formio';
import { FormioGridComponent } from './grid.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormGridHeaderComponent } from './form/FormGridHeader.component';
import { FormGridBodyComponent } from './form/FormGridBody.component';
import { FormGridFooterComponent } from './form/FormGridFooter.component';
import { SubmissionGridHeaderComponent } from './submission/SubmissionGridHeader.component';
import { SubmissionGridBodyComponent } from './submission/SubmissionGridBody.component';
import { SubmissionGridFooterComponent } from './submission/SubmissionGridFooter.component';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
import { GridFooterComponent } from './GridFooterComponent';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormioModule,
    RouterModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    FormioGridComponent,
    FormGridHeaderComponent,
    FormGridBodyComponent,
    FormGridFooterComponent,
    SubmissionGridHeaderComponent,
    SubmissionGridBodyComponent,
    SubmissionGridFooterComponent,
    GridHeaderComponent,
    GridBodyComponent,
    GridFooterComponent,
  ],
  exports: [
    FormioGridComponent
  ],
  entryComponents: [
    FormGridHeaderComponent,
    FormGridBodyComponent,
    FormGridFooterComponent,
    SubmissionGridHeaderComponent,
    SubmissionGridBodyComponent,
    SubmissionGridFooterComponent
  ],
  providers: [
    FormioAlerts
  ]
})
export class FormioGrid {}
