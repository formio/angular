"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_component_1 = require("./auth.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
function FormioAuthRoutes(config) {
    config = config || {};
    return [
        {
            path: '',
            component: config.auth || auth_component_1.FormioAuthComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'login',
                    pathMatch: 'full'
                },
                {
                    path: 'login',
                    component: config.login || login_component_1.FormioAuthLoginComponent
                },
                {
                    path: 'register',
                    component: config.register || register_component_1.FormioAuthRegisterComponent
                }
            ]
        }
    ];
}
exports.FormioAuthRoutes = FormioAuthRoutes;
;
