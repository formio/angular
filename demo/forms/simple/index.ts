import { Component, AfterViewInit } from '@angular/core';
import { FormioAppConfig } from '../../../dist';
declare var Prism: any;
@Component({
  template: require('./simple.html')
})
export class SimpleFormComponent implements AfterViewInit {
  constructor(public config: FormioAppConfig) {}
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
