import { Component, ViewChild, ElementRef, Input, TemplateRef, AfterViewInit } from '@angular/core';

/* tslint:disable:component-selector */
@Component({
  selector: 'ace-editor',
  template: '<div #editor><ng-container *ngTemplateOutlet="contents"></ng-container></div>'
})
/* tslint:enable:component-selector */
export class AceEditorComponent implements AfterViewInit {
  @ViewChild('editor') editorElement: ElementRef;
  @Input() options?: any;
  public editor: any;
  ngAfterViewInit() {
    this.options = this.options || {};
    if (!this.options.theme) {
      this.options.theme = 'ace/theme/monokai';
    }
    this.options.mode = this.options.mode || 'javascript';
    this.options.mode = `ace/mode/${this.options.mode}`;
    this.editor = new window['ace'].edit(this.editorElement.nativeElement, this.options);
  }
}
