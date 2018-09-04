import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';

@Component({
  templateUrl: './resource.component.html'
})
export class FormioResourceComponent implements OnInit {
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.service.loadResource(this.route);
  }
}
