import { Component } from '@angular/core';
import { FormioAuthService } from './auth.service';
@Component({
  template: require('./login.component.html')
})
export class FormioAuthLoginComponent {
  constructor(public service: FormioAuthService) {}
}
