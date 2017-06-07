import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormioModule }   from '../../index';
import { FormioAuthComponent }  from './auth.component';
import { FormioAuthLoginComponent } from './login.component';
import { FormioAuthRegisterComponent } from './register.component';

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

export { FormioAuthRoutes } from './auth.routes';
export { FormioAuthConfig } from './auth.config';
export { FormioAuthService } from './auth.service';
export { FormioAuthComponent }  from './auth.component';
export { FormioAuthLoginComponent } from './login.component';
export { FormioAuthRegisterComponent } from './register.component';
