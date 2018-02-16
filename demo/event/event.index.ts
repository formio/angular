import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioResourceIndexComponent, FormioResourceService, FormioResourceConfig } from '../../dist/resource';

@Component({
  template:
    require('./event.index.html') +
    '<formio-grid [src]="gridSrc" [query]="gridQuery" [onForm]="service.formLoaded" (select)="onSelect($event)" (error)="service.onError($event)"></formio-grid>' +
    '<button class="btn btn-primary" *ngIf="service.form" routerLink="new"><span class="glyphicon glyphicon-plus"></span> New {{ service.form.title }}</button>'
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
