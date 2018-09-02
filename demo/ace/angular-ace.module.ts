import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorComponent } from './ace-editor.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AceEditorComponent
  ],
  exports: [
    AceEditorComponent
  ]
})
export class AngularAceModule { }
