import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormioLoader } from '../formio.loader';

/* tslint:disable */
let Formio = require('formiojs');
let FormioUtils = require('formiojs/utils');
let Components = require('formiojs/build/components');
let _get = require('lodash/get');
let _each = require('lodash/each');
let _assign = require('lodash/assign');
/* tslint:enable */

@Component({
  selector: 'formio-grid',
  styles: [
    ':host .formio-grid { position: relative; width: 100%; }',
    ':host >>> ul.pagination { margin: 5px 0; }',
    '.item-counter { margin: 5px 0; }',
    '.page-num { font-size: 1.4em; }',
    '.grid-refresh { height: 400px; width: 100%; }'
  ],
  template: require('./grid.component.html')
})
export class FormioGridComponent implements OnInit, OnChanges {
  @Input() src: string;
  @Input() onForm: Promise<any>;
  @Input() query: any;
  @Input() refresh: EventEmitter<object>;
  @Output() select: EventEmitter<object>;
  @Output() error: EventEmitter<any>;

  public columns: any[] = [];
  public rows: any[] = [];
  public formio: any;
  public form: any;
  public total: number = 0;
  public page: number = 0;
  public firstItem: number = 0;
  public lastItem: number = 0;
  public skip: number = 0;
  public isLoading: boolean = false;
  public initialized: boolean = false;

  constructor(public loader: FormioLoader) {
    this.select = new EventEmitter();
    this.error = new EventEmitter();
    this.loader.loading = true;
  }

  loadGrid(src?: string) {
    // If no source is provided, then skip.
    if (!src) {
      return;
    }
    // Do not double load.
    if (this.formio && (src === this.src)) {
      return;
    }

    this.formio = new Formio(this.src, {formOnly: true});
    if (!this.onForm) {
      this.onForm = this.formio.loadForm();
    }
    this.onForm.then((form: any) => {
      this.form = form;
      this.setupColumns();
    });
    this.setPage(0);
  }

  ngOnInit() {
    this.query = this.query || {};

    if (this.refresh) {
      this.refresh.subscribe((query: object) => this.refreshGrid(query));
    }

    // Load the grid.
    this.loadGrid(this.src);
    this.initialized = true;
  }

  ngOnChanges(changes: any) {
    if (this.initialized && changes.src && changes.src.currentValue) {
      this.loadGrid(changes.src.currentValue);
    }
  }

  setupColumns() {
    FormioUtils.eachComponent(this.form.components, (component:any) => {
      if (component.input && component.tableView) {
        this.columns.push({
          label: component.label,
          key: 'data.' + component.key,
          sort: '',
          component: Components.create(component, null, null, true)
        });
      }
    });
  }

  set loading(_loading: boolean) {
    this.loader.loading = this.isLoading = _loading;
  }

  onError(error: any) {
    this.error.emit(error);
  }

  refreshGrid(query?: any) {
    query = query || {};
    query = _assign(query, this.query);
    if (!query.hasOwnProperty('limit')) {
      query.limit = 10;
    }
    if (!query.hasOwnProperty('skip')) {
      query.skip = 0;
    }
    this.loading = true;
    this.formio.loadSubmissions({params: query}).then((submissions:any) => {
      this.firstItem = this.query.skip + 1;
      this.lastItem = this.firstItem + submissions.length - 1;
      this.total = submissions.serverCount;
      this.skip = Math.floor(submissions.skip / query.limit) + 1;
      this.rows = [];
      _each(submissions, (submission:any) => {
        this.rows.push(submission);
      });
      this.loading = false;
    }, (err: any) => this.onError(err)).catch((err: any) => this.onError(err));
  }

  setPage(num: number = -1) {
    if (this.isLoading) {
      return;
    }
    this.page = (num !== -1) ? num : this.page;
    if (!this.query.hasOwnProperty('limit')) {
      this.query.limit = 10;
    }
    if (!this.query.hasOwnProperty('skip')) {
      this.query.skip = 0;
    }
    this.query.skip = this.page * this.query.limit;
    this.refreshGrid();
  }

  sortColumn(column:any) {
    // Reset all other column sorts.
    _each(this.columns, (col:any) => {
      if (col.key !== column.key) {
        col.sort = '';
      }
    });
    switch (column.sort) {
      case 'asc':
        column.sort = 'desc';
        this.query.sort = '-' + column.key;
        break;
      case 'desc':
        column.sort = '';
        delete this.query.sort;
        break;
      case '':
        column.sort = 'asc';
        this.query.sort = column.key;
        break;
    }
    this.refreshGrid();
  }

  pageChanged(page:any) {
    this.setPage(page.page - 1);
  }

  onClick(row:any) {
    this.select.emit(row);
  }

  data(row:any, col:any) {
    const cellValue: any = _get(row, col.key);
    return col.component.asString(cellValue);
  }
}
