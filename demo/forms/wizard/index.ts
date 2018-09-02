import { Component, AfterViewInit } from '@angular/core';
import { FormioAppConfig } from '../../../dist';
declare var Prism: any;
@Component({
  template: require('./wizard.html')
})
export class WizardFormComponent implements AfterViewInit {
  constructor(public config: FormioAppConfig) {}
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
