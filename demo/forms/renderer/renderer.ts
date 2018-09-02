import { Component, AfterViewInit } from '@angular/core';
declare var Prism: any;
@Component({
  template: require('./renderer.html')
})
export class FormRendererComponent implements AfterViewInit {
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
