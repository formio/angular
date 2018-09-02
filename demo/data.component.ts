import { Component } from '@angular/core';
import { FormioAppConfig } from '../dist';
import { FormioAuthService } from '../dist/auth';
@Component({
  template: require('./data.component.html')
})
export class DataComponent {
  constructor(public auth: FormioAuthService, public config: FormioAppConfig) {}
}
