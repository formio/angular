import { Component } from '@angular/core';
import {FormioAuthConfig} from './auth.config';
@Component({
  templateUrl: './auth.component.html'
})
export class FormioAuthComponent {
  constructor(public config: FormioAuthConfig) {}
}
