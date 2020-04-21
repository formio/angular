import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import { FormioResourceService } from './resource.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './resource.component.html'
})
export class FormioResourceComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;
  public perms = {delete: false, edit: false};

  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public auth: FormioAuthService,
  ) {
    // subscribe to the route param changes, so that we could re-load the submission if navigation happens from one submission to another
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.service.loadResource(this.route);
    this.service.formLoaded.then((form) => {
      this.auth.ready.then(() => {
        this.service.resourceLoaded.then((resource) => {
          this.service.formFormio.userPermissions(this.auth.user, form, resource).then((perms) => {
            this.perms.delete = perms.delete;
            this.perms.edit = perms.edit;
          });
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
