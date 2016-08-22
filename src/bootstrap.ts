import { NgModule } from '@angular/core';
import { FORMIO } from './formio';
import { FORMIO_TEMPLATE } from './templates/bootstrap';
@NgModule(FORMIO(FORMIO_TEMPLATE))
export class FormioBootstrap {}