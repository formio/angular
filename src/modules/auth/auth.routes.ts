import { Routes } from '@angular/router';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login.component';
import { FormioAuthRegisterComponent } from './register.component';

export function FormioAuthRoutes(config?: any): Routes {
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
