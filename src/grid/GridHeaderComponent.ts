import { Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Formio } from 'formiojs';

export class GridHeaderComponent {
  @Output() sort: EventEmitter<any>;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  public headers: Array<any>;
  constructor() {
    this.headers = [];
    this.sort = new EventEmitter();
  }

  get numHeaders() {
    return this.headers.length;
  }

  load(formio: Formio, query?: any): Promise<any> {
    return Promise.resolve([]);
  }
}
