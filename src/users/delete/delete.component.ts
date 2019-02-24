import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormioUsersService} from '../users.service';

@Component({
  templateUrl: './delete.component.html'
})
export class FormioUsersDeleteComponent {
  constructor(
    public service: FormioUsersService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  onDelete() {
    this.service.remove().then(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

  onCancel() {
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }
}
