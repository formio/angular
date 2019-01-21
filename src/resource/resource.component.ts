import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import { FormioResourceService } from './resource.service';
import { submissionPermissions } from '../formio.utils';

@Component({
  templateUrl: './resource.component.html'
})
export class FormioResourceComponent implements OnInit {
  public perms = {delete: false, edit: false};
  constructor(
    public service: FormioResourceService,
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
