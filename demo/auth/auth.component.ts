import { Component, Inject } from '@angular/core';
import { FormioAuthComponent, FormioAuthService } from '../../dist/auth';

@Component({
  template: require('./auth.component.html')
})
export class AuthComponent extends FormioAuthComponent {
  constructor(public service: FormioAuthService) {
    super();
  }
}
