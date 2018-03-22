import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
@Component({
  templateUrl: './login.component.html'
})
export class FormioAuthLoginComponent {
  constructor(public service: FormioAuthService) {}
}
