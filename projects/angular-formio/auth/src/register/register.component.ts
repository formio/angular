import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
@Component({
  templateUrl: './register.component.html',
  standalone: false
})
export class FormioAuthRegisterComponent {
  public renderOptions: any = {
    submitOnEnter: true
  };
  constructor(public service: FormioAuthService) {}
}
