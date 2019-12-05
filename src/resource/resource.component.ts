import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
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
    public changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.loadResource(this.route);
    this.service.formLoaded.then((form) => {
      this.auth.ready.then(() => {
        this.service.resourceLoaded.then((resource) => {
          this.service.formFormio.userPermissions(this.auth.user, form, resource).then((perms) => {
            this.perms.delete = perms.delete;
            this.perms.edit = perms.edit;
            this.changeDetectorRef.detectChanges();
          });
        });
      });
    });
  }
}
