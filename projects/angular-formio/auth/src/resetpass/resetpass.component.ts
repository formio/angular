import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
import { FormioComponent } from '@formio/angular';
@Component({
    templateUrl: './resetpass.component.html',
    imports: [FormioComponent]
})
export class FormioResetPassComponent {
  constructor(public service: FormioAuthService) {}
}
