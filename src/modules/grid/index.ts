import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioGridComponent } from './grid.component';
import { PaginationModule } from 'ng2-bootstrap/pagination';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
