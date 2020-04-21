import { Output, EventEmitter, ViewChild, TemplateRef, Input } from '@angular/core';
import {FormioPromiseService} from '../formio-promise.service';
import {GridHeader} from './types/grid-header';

export class GridHeaderComponent {
  @Input() actionAllowed: any;
  @Output() sort: EventEmitter<GridHeader>;
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  public headers: Array<GridHeader>;
  constructor() {
    this.headers = [];
    this.sort = new EventEmitter();
  }

  get numHeaders() {
    return this.headers.length;
  }

  load(formio: FormioPromiseService, query?: any, columns?: Array<any>): Promise<any> {
    return Promise.resolve([]);
  }
}
