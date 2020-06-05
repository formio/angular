import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: "<formio [renderer]=\"service.config.renderer\" [src]=\"service.formio.submissionUrl\" (submit)=\"onSubmit($event)\" (formLoad)=\"service.setForm($event)\" (submissionLoad)=\"service.submissionLoaded($event)\" ></formio> "
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
