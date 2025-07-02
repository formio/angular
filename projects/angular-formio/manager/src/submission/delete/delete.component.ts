import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '@formio/angular';
import { FormioAlertsComponent } from '@formio/angular';

@Component({
    templateUrl: './delete.component.html',
    imports: [FormioAlertsComponent]
})
export class SubmissionDeleteComponent {
  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute,
    public alerts: FormioAlerts
  ) {}

  onDelete() {
    this.service.formio.deleteSubmission().then(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }).catch(err => this.alerts.setAlert({type: 'danger', message: (err.message || err)}));
  }

  onCancel() {
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }
}
