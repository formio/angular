import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormioUsersService} from '../users.service';
import {FormioUsersConfig} from '../users.config';

@Component({
  templateUrl: './index.component.html'
})
export class FormioUsersIndexComponent implements OnInit {
  public gridQuery: any;
  public refreshGrid: EventEmitter<object>;
  constructor(
    public service: FormioUsersService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioUsersConfig
  ) {
    this.refreshGrid = new EventEmitter();
  }

  ngOnInit() {
  }
  onSelect(row: any) {
    this.router.navigate([row.path], { relativeTo: this.route });
  }
}
