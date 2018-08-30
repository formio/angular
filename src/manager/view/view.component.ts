import { Component } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './view.component.html'
})
export class FormManagerViewComponent {
  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  onSubmit(submission: any) {
    this.router.navigate(['../', 'submission', submission._id], {relativeTo: this.route});
  }
}
