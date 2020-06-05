import { Routes } from '@angular/router';
import { FormioAuthRouteConfig } from './auth.config';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
export function FormioAuthRoutes(config?: FormioAuthRouteConfig): Routes {
  return [
    {
      path: '',
      component: config && config.auth ? config.auth : FormioAuthComponent,
      children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
        },
        {
          path: 'login',
          component: config && config.login ? config.login : FormioAuthLoginComponent
        },
        {
          path: 'register',
          component: config && config.register ? config.register : FormioAuthRegisterComponent
        }
      ]
    }
  ];
}
