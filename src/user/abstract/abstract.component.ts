import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formio } from 'formiojs';
import {FormManagerConfig, FormManagerService} from '../../manager';

@Component({
  templateUrl: './abstract.component.html'
})
export class UserFormManagerFormComponent implements OnInit {
  formio: any;
  formUrl: any;
  src: any;
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public options: FormManagerConfig
  ) { }

  ngOnInit() {
    this.service.reset(this.route);
  }
}
