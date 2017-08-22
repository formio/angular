import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioAppConfig } from '../../src';
import { FormioAuthModule, FormioAuthRoutes, FormioAuthService, FormioAuthConfig } from '../../src/auth';
import { AuthComponent } from "./auth.component";
import { AppConfig } from '../config';

export const authRoutes = FormioAuthRoutes({
  auth: AuthComponent
});

@NgModule({
  imports: [
    CommonModule,
    FormioAuthModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    FormioAuthService,
    {provide: FormioAppConfig, useValue: AppConfig},
    {provide: FormioAuthConfig, useValue: {
      login: {
        form: 'user/login'
      },
      register: {
        form: 'user/register'
      }
    }}
  ]
})
export class AuthDemoModule {}
