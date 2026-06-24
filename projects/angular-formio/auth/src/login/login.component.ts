import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
@Component({
  templateUrl: './login.component.html',
  standalone: false
})
export class FormioAuthLoginComponent {
  public renderOptions: any = {
    submitOnEnter: true
  };
  constructor(public service: FormioAuthService) {}
}
