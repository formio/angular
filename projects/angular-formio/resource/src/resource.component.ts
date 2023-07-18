import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '@formio/angular/auth';
import { FormioResourceService } from './resource.service';

@Component({
  templateUrl: './resource.component.html'
})
export class FormioResourceComponent implements OnInit {
  public perms = {delete: false, edit: false};

  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public auth: FormioAuthService,
  ) {
  }

  ngOnInit() {
    this.service.init(this.route).then(() => this.init());
  }

  init() {
    return this.service.loadForm().then((form) => {
      return this.service.loadResource().then((resource) => {
        return this.auth.ready.then(() => {
          return this.service.formFormio.userPermissions(this.auth.user, form, resource).then((perms) => {
            this.perms.delete = perms.delete;
            this.perms.edit = perms.edit;
            return resource;
          });
        });
      });
    });
  }
}
