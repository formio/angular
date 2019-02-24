import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormioUsersService} from '../users.service';
import {FormioUsersConfig} from '../users.config';

@Component({
  styleUrls: ['./create.component.scss'],
  templateUrl: './create.component.html'
})
export class UsersCreateComponent implements OnInit {
  public onError: EventEmitter<any>;
  public onSuccess: EventEmitter<any>;
  constructor(
    public service: FormioUsersService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioUsersConfig
  ) {
    this.onError = new EventEmitter();
    this.onSuccess = new EventEmitter();
  }

  ngOnInit() {
    this.service.setContext(this.route);
  }

  onSubmit(submission: any) {
    this.service
      .save(submission)
      .then(() => {
        this.router.navigate(['../', this.service.resource._id, 'view'], {
          relativeTo: this.route
        });
      })
      .catch((err: any) => this.onError.emit(err));
  }
}
