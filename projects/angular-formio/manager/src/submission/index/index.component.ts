import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../../form-manager.service';
import { FormioGridComponent } from '@formio/angular/grid';

@Component({
    templateUrl: './index.component.html',
    imports: [FormioGridComponent]
})
export class SubmissionIndexComponent {
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], {relativeTo: this.route});
  }
}
