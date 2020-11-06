import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
@Component({
  templateUrl: './login.component.html'
})
export class FormioAuthLoginComponent {
  public options: any = { disableAlerts: false, noAlerts: true };

  constructor(public service: FormioAuthService) {}
}
