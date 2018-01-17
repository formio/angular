import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';

@Component({
  template: `
      <ul class="nav nav-tabs">
        <li class="nav-item"><a class="nav-link" routerLink="../"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></a></li>
        <li class="nav-item" routerLinkActive="active"><a class="nav-link" routerLink="view" routerLinkActive="active">View</a></li>
        <li class="nav-item" routerLinkActive="active"><a class="nav-link" routerLink="edit" routerLinkActive="active">Edit</a></li>
        <li class="nav-item" routerLinkActive="active"><a class="nav-link" routerLink="delete" routerLinkActive="active"><span class="fa fa-trash glyphicon glyphicon-trash"></span></a></li>
      </ul>
      <router-outlet></router-outlet>`
})
export class FormioResourceComponent implements OnInit {
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.service.initialize();
    this.service.loadResource(this.route);
  }
}
