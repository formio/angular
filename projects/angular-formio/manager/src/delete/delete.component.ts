import { Component } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '@formio/angular';
import { GridService } from '@formio/angular/grid';

@Component({
  templateUrl: './delete.component.html'
})
export class FormManagerDeleteComponent {
  constructor(
    public managerService: FormManagerService,
    public gridService: GridService,
    public router: Router,
    public route: ActivatedRoute,
    public alerts: FormioAlerts
  ) {}

  onDelete() {
    this.managerService.formio.deleteForm().then(() => {
      const currentPage = +localStorage.getItem('currentPage') || 0;
      const formsNumberPerPage = this.gridService.getFormsPerPage();

      if (formsNumberPerPage === 1 && currentPage !== 0) {
        localStorage.setItem('currentPage', `${currentPage - 1}`);
      }
      
      this.router.navigate(['../../'], { relativeTo: this.route });
    }).catch(err => this.alerts.setAlert({type: 'danger', message: (err.message || err)}));
  }

  onCancel() {
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }
}
