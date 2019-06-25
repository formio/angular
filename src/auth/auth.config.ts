import { Injectable } from '@angular/core';

export interface FormioAuthFormConfig {
  path?: string;
  form?: string;
  component?: any;
}

export interface FormioAuthRouteConfig {
  auth?: any;
  login?: any;
  register?: any;
}

@Injectable()
export class FormioAuthConfig {
  component?: any;
  delayAuth?: any;
  project?: string;
  login?: FormioAuthFormConfig;
  register?: FormioAuthFormConfig;
}
