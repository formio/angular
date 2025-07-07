import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { FormioComponent } from '@formio/angular';

@Component({
  templateUrl: './view.component.html',
  imports: [FormioComponent]
})
export class SubmissionViewComponent {
  constructor(public service: FormManagerService) { }
}
