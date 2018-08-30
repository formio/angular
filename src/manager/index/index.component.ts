import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';

@Component({
  templateUrl: './index.component.html'
})
export class FormManagerIndexComponent {
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  onAction(action: any) {
    this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
  }

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], { relativeTo: this.route });
  }

  onCreateItem() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
