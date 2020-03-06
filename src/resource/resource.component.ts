import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import { FormioResourceService } from './resource.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './resource.component.html'
})
export class FormioResourceComponent implements OnInit, OnDestroy {
  private navigationSubscription: Subscription;
  public perms = {delete: false, edit: false};

  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public auth: FormioAuthService,
    public changeDetectorRef: ChangeDetectorRef,
    public router: Router,
  ) {
    // subscribe to the router events, so that we could re-load the submission if navigation happens from one submission to another
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
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
            this.changeDetectorRef.detectChanges();
          });
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
