import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormioModule } from '../formio.module';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild([])
  ],
  declarations: [
    FormioAuthComponent,
    FormioAuthLoginComponent,
    FormioAuthRegisterComponent
  ]
})
export class FormioAuth {}
