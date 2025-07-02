import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';

@Component({
  templateUrl: './view.component.html',
  standalone: false
})
export class SubmissionViewComponent {
  constructor(public service: FormManagerService) { }
}
