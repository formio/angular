import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioAuth, FormioAuthRoutes } from '../../dist/auth';
import { FormioModule } from '../../dist';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './auth.login';

export const authRoutes = FormioAuthRoutes({
  auth: AuthComponent,
  login: AuthLoginComponent
});

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    FormioAuth,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    AuthComponent,
    AuthLoginComponent
  ]
})
export class AuthDemoModule {}
