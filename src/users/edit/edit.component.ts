import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormioUsersService} from '../users.service';
import {FormioUsersConfig} from '../users.config';

@Component({
  templateUrl: './edit.component.html'
})
export class FormioUsersEditComponent {
  public triggerError: EventEmitter<any> = new EventEmitter();
  constructor(
    public service: FormioUsersService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioUsersConfig
  ) {}

  onSubmit(submission: any) {
    const edit = this.service.resource;
    edit.data = submission.data;
    this.service.save(edit)
      .then(() => {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
      })
      .catch((err) => this.triggerError.emit(err));
  }
}
