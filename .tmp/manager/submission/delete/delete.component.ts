import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '../../../components/alerts/formio.alerts';

@Component({
  template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts> <h3>Are you sure you wish to delete this record?</h3> <div class=\"btn-toolbar\"> <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button> <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button> </div> "
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
