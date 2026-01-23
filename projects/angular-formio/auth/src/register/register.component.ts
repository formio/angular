import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
import { FormioComponent } from '@formio/angular';
@Component({
  templateUrl: './register.component.html',
  imports: [FormioComponent]
})
export class FormioAuthRegisterComponent {
  public renderOptions: any = {
    submitOnEnter: true
  };
  constructor(public service: FormioAuthService) {}
}
