import { Input, Output, EventEmitter, ViewChild, TemplateRef, Component } from '@angular/core';
import { each, clone } from 'lodash';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridService } from './grid.service';
import {FormioPromiseService} from '@formio/angular';

@Component({
  template: ''
})
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
  constructor(public service: GridService) {
    this.rowSelect = new EventEmitter();
    this.rowAction = new EventEmitter();
    this.loading = true;
  }

  load(formio: FormioPromiseService, query?: any): Promise<any> {
    return formio.loadForm(query);
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

    if (typeof items !== 'object') {
      this.firstItem = 0;
      this.lastItem = 0;
      this.total = 0;
      this.skip = 0;
      this.loading = false;
      this.service.setRows(this.rows);
      
      return this.rows;
    }

    this.firstItem = query.skip + 1;
    this.lastItem = this.firstItem + items.length - 1;
    if (this.lastItem === 0) {
      this.firstItem = 0;
    }
    this.total = items.serverCount;
    this.limit = query.limit;
    this.skip = Math.floor(items.skip / query.limit) + 1;
    this.loading = false;
    each(items, (item: any) => {
      this.rows.push(clone(item));
    });
    this.service.setRows(this.rows);

    return this.rows;
  }
}
