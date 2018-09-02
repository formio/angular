"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint: disable */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var dist_1 = require("../dist");
var auth_1 = require("../dist/auth");
var grid_1 = require("../dist/grid");
var config_1 = require("./config");
var forms_1 = require("./forms");
var demo_component_1 = require("./demo.component");
var auth_module_1 = require("./auth/auth.module");
var home_component_1 = require("./home.component");
var data_component_1 = require("./data.component");
var event_module_1 = require("./event/event.module");
var DemoModule = /** @class */ (function () {
    function DemoModule() {
    }
    DemoModule = __decorate([
        core_1.NgModule({
            declarations: [
                demo_component_1.FormioDemoComponent,
                home_component_1.HomeComponent,
                data_component_1.DataComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                dist_1.FormioModule,
                auth_1.FormioAuth,
                grid_1.FormioGrid,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: 'data',
                        component: data_component_1.DataComponent
                    },
                    {
                        path: 'forms',
                        loadChildren: function () { return forms_1.FormioFormsModule; }
                    },
                    {
                        path: 'auth',
                        loadChildren: function () { return auth_module_1.AuthDemoModule; }
                    },
                    {
                        path: 'event',
                        loadChildren: function () { return event_module_1.EventModule; }
                    }
                ])
            ],
            providers: [
                auth_1.FormioAuthService,
                { provide: dist_1.FormioAppConfig, useValue: config_1.AppConfig },
                { provide: auth_1.FormioAuthConfig, useValue: {
                        login: {
                            form: 'user/login'
                        },
                        register: {
                            form: 'user/register'
                        }
                    } }
            ],
            bootstrap: [demo_component_1.FormioDemoComponent]
        })
    ], DemoModule);
    return DemoModule;
}());
exports.DemoModule = DemoModule;
/* tslint: enable */
