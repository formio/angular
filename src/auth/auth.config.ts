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
  verify?: any;
  reset?: any;

}

@Injectable()
export class FormioAuthConfig {
  component?: any;
  login?: FormioAuthFormConfig;
  register?: FormioAuthFormConfig;
  verify?: FormioAuthFormConfig;
  reset?: FormioAuthFormConfig;
  enableReset?: true;
  redirect =  '';
}
