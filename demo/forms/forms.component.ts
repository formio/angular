/* tslint: disable */
import { Component } from '@angular/core';
import { FormRoutes } from './';

@Component({
  template: require('./forms.component.html')
})
export class FormioFormsComponent {
  public forms: any[] = FormRoutes[0].children.filter((item: any) => {
    return !!item.path;
  });
}
/* tslint: enable */
