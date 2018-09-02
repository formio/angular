import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManagerIndexComponent, FormManagerService, FormManagerConfig } from '../../dist/manager';
import { FormioAuthService } from '../../dist/auth';

@Component({
  template: require('./form-manager.index.html')
})
export class DemoFormManagerIndexComponent extends FormManagerIndexComponent {
  constructor(
    public auth: FormioAuthService,
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormManagerConfig
  ) {
    super(service, route, router, config);
  }
}
