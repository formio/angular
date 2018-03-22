import { Routes } from '@angular/router';
import { FormioAuthRouteConfig } from './auth.config';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';

export function FormioAuthRoutes(config?: FormioAuthRouteConfig): Routes {
  config = config || {};
  return [
    {
      path: '',
      component: config.auth || FormioAuthComponent,
      children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
        },
        {
          path: 'login',
          component: config.login || FormioAuthLoginComponent
        },
        {
          path: 'register',
          component: config.register || FormioAuthRegisterComponent
        }
      ]
    }
  ];
};
