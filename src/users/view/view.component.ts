import { Component } from '@angular/core';
import {FormioUsersService} from '../users.service';
import {FormioUsersConfig} from '../users.config';

@Component({
  templateUrl: './view.component.html'
})
export class FormioUsersViewComponent {
  constructor(
    public service: FormioUsersService,
    public config: FormioUsersConfig
  ) {}
}
