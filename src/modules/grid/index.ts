import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '../../index';
import { FormioGridComponent } from './grid.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormioModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        FormioGridComponent
    ],
    exports: [
        FormioGridComponent
    ]
})
export class FormioGrid {}
