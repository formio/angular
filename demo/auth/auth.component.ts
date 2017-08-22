import { Component } from '@angular/core';
import { FormioAuthComponent, FormioAuthService } from '../../src/auth';

@Component({
  template: require('./auth.component.html')
})
export class AuthComponent extends FormioAuthComponent {
  constructor(public service: FormioAuthService) {
    super();
  }
}
