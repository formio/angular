/* tslint: disable */
import { Component } from '@angular/core';
import { FormioAuthService } from '../dist/auth';

@Component({
  selector: 'formio-demo-app',
  template: require('./demo.component.html')
})
export class FormioDemoComponent {
  constructor(public auth: FormioAuthService) {
  }
}
/* tslint: enable */
