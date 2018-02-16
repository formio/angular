import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioAuthModule, FormioAuthRoutes } from '../../dist/auth';
import { AuthComponent } from "./auth.component";

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
  ]
})
export class AuthDemoModule {}
