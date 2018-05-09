import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { FormioLoader } from '../components/loader/formio.loader';
import { FormioAlerts } from '../components/alerts/formio.alerts';
import { assign, each, get } from 'lodash';
import { Formio } from 'formiojs';
import FormioUtils from 'formiojs/utils';
import FormioComponentsIndex from 'formiojs/components';

@Component({
  selector: 'formio-grid',
  styleUrls: ['./grid.component.scss'],
  templateUrl: './grid.component.html'
})
export class FormioGridComponent implements OnInit, OnChanges {
  @Input() src?: string;
  @Input() onForm?: Promise<any>;
  @Input() query: any;
  @Input() refresh?: EventEmitter<object>;
  @Output() select: EventEmitter<object>;
  @Output() error: EventEmitter<any>;

  public columns: any[] = [];
  public rows: any[] = [];
  public formio: any;
  public form: any;
  public total = 0;
  public page = 0;
  public firstItem = 0;
  public lastItem = 0;
  public skip = 0;
  public isLoading = false;
  public initialized = false;

  constructor(public loader: FormioLoader, public alerts: FormioAlerts) {
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
    if (this.formio && src === this.src) {
      return;
    }

    this.formio = new Formio(this.src, { formOnly: true });
    this.formio.loadForm().then((form: any) => {
      this.form = form;
      this.setupColumns();
    });
    this.setPage(0);
  }

  ngOnInit() {
    this.alerts.setAlerts([]);
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
    FormioUtils.eachComponent(this.form.components, (component: any) => {
      if (component.input && component.tableView) {
        this.columns.push({
          label: component.label,
          key: 'data.' + component.key,
          sort: '',
          component: FormioComponentsIndex.create(component, null, null, true)
        });
      }
    });
  }

  set loading(_loading: boolean) {
    this.loader.loading = this.isLoading = _loading;
  }

  onError(error: any) {
    this.error.emit(error);
    this.alerts.setAlert({
      type: 'danger',
      message: error
    });
  }

  refreshGrid(query?: any) {
    this.alerts.setAlerts([]);
    query = query || {};
    query = assign(query, this.query);
    if (!query.hasOwnProperty('limit')) {
      query.limit = 10;
    }
    if (!query.hasOwnProperty('skip')) {
      query.skip = 0;
    }
    this.loading = true;
    this.formio
      .loadSubmissions({ params: query })
      .then(
        (submissions: any) => {
          this.firstItem = this.query.skip + 1;
          this.lastItem = this.firstItem + submissions.length - 1;
          this.total = submissions.serverCount;
          this.skip = Math.floor(submissions.skip / query.limit) + 1;
          this.rows = [];
          each(submissions, (submission: any) => {
            this.rows.push(submission);
          });
          this.loading = false;
        },
        (err: any) => this.onError(err)
      )
      .catch((err: any) => this.onError(err));
  }

  setPage(num: number = -1) {
    if (this.isLoading) {
      return;
    }
    this.page = num !== -1 ? num : this.page;
    if (!this.query.hasOwnProperty('limit')) {
      this.query.limit = 10;
    }
    if (!this.query.hasOwnProperty('skip')) {
      this.query.skip = 0;
    }
    this.query.skip = this.page * this.query.limit;
    this.refreshGrid();
  }

  sortColumn(column: any) {
    // Reset all other column sorts.
    each(this.columns, (col: any) => {
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

  pageChanged(page: any) {
    this.setPage(page.page - 1);
  }

  onClick(row: any) {
    this.select.emit(row);
  }

  data(row: any, col: any) {
    const cellValue: any = get(row, col.key);
    if (typeof col.component.getView === 'function') {
      return col.component.getView(cellValue);
    }
    return col.component.asString(cellValue);
  }
}
