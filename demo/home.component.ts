import { Component, AfterViewInit } from '@angular/core';
import { FormioAppConfig } from '../dist';
declare var Prism: any;
@Component({
  template: require('./home.component.html')
})
export class HomeComponent implements AfterViewInit {
  constructor(public config: FormioAppConfig) {}
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
