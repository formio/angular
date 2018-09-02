import { Component } from '@angular/core';
import { FormioAppConfig } from '../../../dist';
@Component({
  template: require('./pdf.html')
})
export class PDFFormComponent {
  constructor(public config: FormioAppConfig) {}
}
