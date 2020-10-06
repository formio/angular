import { Injectable } from '@angular/core';

export interface FormioResourceRouteConfig {
  index?: any;
  create?: any;
  resource?: any;
  view?: any;
  edit?: any;
  delete?: any;
}

@Injectable()
export class FormioResourceConfig {
  name = '';
  form = '';
  parents: any[] = [];
}
