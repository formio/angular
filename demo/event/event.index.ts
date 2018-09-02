import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormioResourceIndexComponent,
  FormioResourceService,
  FormioResourceConfig
} from '../../dist/resource';
import {
  FormioAuthService
} from '../../dist/auth';

/* tslint:disable */
@Component({
  template: require('./event.index.html')
})
/* tslint:enable */
export class EventIndexComponent extends FormioResourceIndexComponent {
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig,
    public auth: FormioAuthService
  ) {
    super(service, route, router, config);
  }
}
