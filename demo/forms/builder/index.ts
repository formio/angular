import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
declare var Prism: any;
@Component({
  template: require('./builder.html')
})
export class BuilderComponent implements AfterViewInit {
  @ViewChild('json') jsonElement?: ElementRef;
  @ViewChild('code') codeElement?: ElementRef;

  public form: Object = {
    components: []
  };

  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
