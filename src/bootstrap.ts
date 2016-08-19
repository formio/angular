import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { FORMIO } from './formio';
import { FORMIO_TEMPLATE } from './templates/bootstrap';
@NgModule({
    declarations: FORMIO(FORMIO_TEMPLATE),
    imports: [BrowserModule, ReactiveFormsModule]
})
export class FormioBootstrap {}