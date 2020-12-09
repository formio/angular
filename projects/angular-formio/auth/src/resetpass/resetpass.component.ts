import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
@Component({
  templateUrl: './resetpass.component.html'
})
export class FormioResetPassComponent {
  constructor(public service: FormioAuthService) {}
}
