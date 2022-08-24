import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@heybaton/formio-ng';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
import { FormioResetPassComponent } from './resetpass/resetpass.component';
import { FormioAuthRouteConfig } from './auth.config';
import { FormioAuthRoutes } from './auth.routes';
import { extendRouter } from '@heybaton/formio-ng';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule
  ],
  declarations: [
    FormioAuthComponent,
    FormioAuthLoginComponent,
    FormioAuthRegisterComponent,
    FormioResetPassComponent
  ]
})
export class FormioAuth {
  static forRoot(config?: FormioAuthRouteConfig): any {
    return extendRouter(FormioAuth, config, FormioAuthRoutes);
  }
  static forChild(config?: FormioAuthRouteConfig): any {
    return extendRouter(FormioAuth, config, FormioAuthRoutes);
  }
}
