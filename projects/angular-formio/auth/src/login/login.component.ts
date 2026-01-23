import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
import { FormioComponent } from '@formio/angular';
@Component({
  templateUrl: './login.component.html',
  imports: [FormioComponent]
})
export class FormioAuthLoginComponent {
  public renderOptions: any = {
    submitOnEnter: true
  };
  constructor(public service: FormioAuthService) {}
}
