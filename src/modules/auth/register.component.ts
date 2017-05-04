import { Component } from '@angular/core';
import { FormioAuthService } from './auth.service';
@Component({
  template: '<formio [src]="service.registerForm" (submit)="service.onRegisterSubmit($event)"></formio>'
})
export class FormioAuthRegisterComponent {
  constructor(public service: FormioAuthService) {}
}
