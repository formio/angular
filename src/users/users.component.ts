import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import { submissionPermissions } from '../formio.utils';
import {FormioUsersService} from './users.service';

@Component({
  templateUrl: './users.component.html'
})
export class FormioUsersComponent implements OnInit {
  public perms = {delete: false, edit: false};
  constructor(
    public service: FormioUsersService,
    public route: ActivatedRoute,
    public auth: FormioAuthService
  ) {}

  ngOnInit() {
    this.service.loadResource(this.route);
    this.service.formLoaded.then((form) => {
      this.auth.ready.then(() => {
        this.service.resourceLoaded.then((resource) => {
          submissionPermissions(this.service.formFormio, form, resource, this.auth.user).then((perms) => {
            this.perms.delete = perms.delete;
            this.perms.edit = perms.edit;
          });
        });
      });
    });
  }
}
