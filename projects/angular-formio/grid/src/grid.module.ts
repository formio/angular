import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
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
import { GridService } from './grid.service';
import { TimeSince } from './form/time-since.pipe'
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
        TimeSince
    ],
    exports: [
        FormioGridComponent
    ],
    providers: [
        FormioAlerts,
        GridService
    ]
})
export class FormioGrid {}
