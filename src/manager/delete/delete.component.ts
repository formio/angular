import { Component } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './delete.component.html'
})
export class FormManagerDeleteComponent {
  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  onDelete() {
    this.service.formio.deleteForm().then(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

  onCancel() {
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }
}
