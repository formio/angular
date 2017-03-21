import { Component } from '@angular/core';
import { FormRoutes } from '../../forms';
let _each = require('lodash/each');
@Component({
  template: require('./home.html')
})
export class HomeComponent {
  private forms: Array<any>;
  constructor() {
    this.forms = [];
    _each(FormRoutes, (route: any) => {
      if (route.component) {
        this.forms.push(route);
      }
    });
  }
}
