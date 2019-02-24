import { Injectable } from '@angular/core';

export interface FormioUsersRouteConfig {
  index?: any;
  create?: any;
  resource?: any;
  view?: any;
  edit?: any;
  delete?: any;
}

@Injectable()
export class FormioUsersConfig {
  name = '';
  form = '';
  tag = '';
  userInvite?: true;
}
