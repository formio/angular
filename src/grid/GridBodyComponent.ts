import { Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { each, clone } from 'lodash';
import { GridHeaderComponent } from './GridHeaderComponent';
import {FormioPromiseService} from '../formio-promise.service';

export class GridBodyComponent {
  @Input() header: GridHeaderComponent;
  @Input() actionAllowed: any;
  @Output() rowSelect: EventEmitter<any>;
  @Output() rowAction: EventEmitter<any>;
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
  public rows: Array<any>;
  public loading: Boolean;
  public firstItem = 0;
  public lastItem = 0;
  public skip = 0;
  public limit = 0;
  public total = 0;
  constructor() {
    this.rowSelect = new EventEmitter();
    this.rowAction = new EventEmitter();
    this.loading = true;
  }

  load(formio: FormioPromiseService, query?: any): Promise<any> {
    return Promise.resolve({});
  }

  onRowSelect(event, row) {
    event.preventDefault();
    this.rowSelect.emit(row);
  }

  onRowAction(event, row, action) {
    event.preventDefault();
    this.rowAction.emit({ row, action });
  }

  /**
   * Set the rows for this Grid body.
   *
   * @param query
   * @param items
   * @return any
   */
  setRows(query: any, items: any) {
    this.rows = [];
    this.firstItem = query.skip + 1;
    this.lastItem = this.firstItem + items.length - 1;
    this.total = items.serverCount;
    this.limit = query.limit;
    this.skip = Math.floor(items.skip / query.limit) + 1;
    this.loading = false;
    each(items, (item: any) => {
      this.rows.push(clone(item));
    });
    return this.rows;
  }
}
