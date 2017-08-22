import { Component } from '@angular/core';
import { FormioAuthService } from './auth.service';
@Component({
  template: require('./register.component.html')
})
export class FormioAuthRegisterComponent {
  constructor(public service: FormioAuthService) {}
}
