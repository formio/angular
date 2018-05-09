import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Prism from 'prismjs';

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
    let formattedCode = Prism.highlight(`import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  template: require('./builder.html')
})
export class BuilderComponent {
  @ViewChild('json') jsonElement?: ElementRef;
  public form: Object = {components: []};
  onChange(event) {
    console.log(event.form);
  }
}`, Prism.languages.javascript, 'javascript');
    this.codeElement.nativeElement.innerHTML = formattedCode;
  }
}
