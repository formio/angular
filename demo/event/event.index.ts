import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioResourceIndexComponent, FormioResourceService, FormioResourceConfig } from '../../src/resource';

@Component({
  template: require('./event.index.html') + require('../../src/resource/index.component.html')
})
export class EventIndexComponent extends FormioResourceIndexComponent {
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig
  ) {
    super(service, route, router, config);
  }
}
