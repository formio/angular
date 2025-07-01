import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';

@Component({
    templateUrl: './edit.component.html',
    imports: [FormioComponent]
})
export class SubmissionEditComponent {
  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  onSubmit(submission) {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
