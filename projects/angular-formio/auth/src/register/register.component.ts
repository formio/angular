import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
@Component({
  templateUrl: './register.component.html'
})
export class FormioAuthRegisterComponent {
  constructor(public service: FormioAuthService) {}
}
