import { Inject, Injectable, InjectionToken } from '@angular/core';
export const FORMIO_CONFIG = new InjectionToken('formio-config');
import { Formio } from 'formiojs';

@Injectable()
export class FormioAppConfig {
  appUrl = '';
  apiUrl = '';
  icons?: string;
  formOnly?: boolean;
  formio?: Formio;
  constructor(@Inject(FORMIO_CONFIG) config: {
    apiUrl?: string,
    baseUrl?: string, 
    appUrl?: string,
    projectUrl?: string 
  } = {}) {
    this.apiUrl = config.apiUrl || config.baseUrl;
    this.appUrl = config.appUrl || config.projectUrl;
    if (this.apiUrl) {
      Formio.setBaseUrl(this.apiUrl);
      Formio.setProjectUrl(this.appUrl);
      this.formio = new Formio(this.appUrl);
    }
  }
}
