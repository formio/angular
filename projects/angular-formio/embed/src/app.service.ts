import { Inject, Injectable, InjectionToken, EventEmitter } from '@angular/core';
export const FormioAppConfig = new InjectionToken('formio-config');
import { FormioCore as Formio } from '@formio/js';
@Injectable()
export class FormioAppService {
    baseUrl;
    apiUrl;
    projectUrl;
    appUrl;
    icons?: string;
    formio: Formio;
    user?: any;
    onUser: EventEmitter<object> = new EventEmitter<object>();
    constructor(@Inject(FormioAppConfig) config: {
        apiUrl?: string,
        baseUrl?: string,
        appUrl?: string,
        projectUrl?: string,
        icons?: string,
        config?: any
    } = {}) {
        this.baseUrl = this.apiUrl = config.apiUrl || config.baseUrl;
        this.projectUrl = this.appUrl = config.appUrl || config.projectUrl;
        if (this.baseUrl) {
            Formio.setBaseUrl(this.baseUrl);
            Formio.setProjectUrl(this.projectUrl);
            if (config.icons) {
                Formio.icons = config.icons;
            }
            if (config.config) {
                for (let key in config.config) {
                    Formio.config[key] = config.config[key];
                }
            }
            Formio.events.on('formio.user', (user) => this.setUser(user));
            this.formio = new Formio(this.projectUrl);
            this.authenticate();
        }
    }

    setUser(user) {
        this.user = user;
        this.onUser.emit(user);
    }

    logout() {
        return Formio.logout().then(() => {
            this.setUser(null);
            Formio.clearCache();
        }).catch(() => {
            this.setUser(null);
            Formio.clearCache();
        });
    }

    authenticate() {
        return this.formio.currentUser().then((user) => this.setUser(user)).catch(() => this.setUser(null));
    }
}