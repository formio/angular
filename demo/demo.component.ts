import { Component } from '@angular/core';
import { FormioAuthService } from '../dist/auth';

/* tslint:disable */
@Component({
  selector: 'formio-demo-app',
  template: require('./demo.component.html')
})
/* tslint:enable */
export class FormioDemoComponent {
  constructor(public auth: FormioAuthService) {}
}
