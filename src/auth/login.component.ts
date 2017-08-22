import { Component } from '@angular/core';
import { FormioAuthService } from './auth.service';
@Component({
  template: '<formio [src]="service.loginForm" (submit)="service.onLoginSubmit($event)"></formio>'
})
export class FormioAuthLoginComponent {
  constructor(public service: FormioAuthService) {}
}
