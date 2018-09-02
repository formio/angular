import { Component } from '@angular/core';
import { FormioAuthLoginComponent, FormioAuthService } from '../../dist/auth';

@Component({
  template: require('./auth.login.html')
})
export class AuthLoginComponent extends FormioAuthLoginComponent {
  constructor(public service: FormioAuthService) {
    super(service);
  }
}
