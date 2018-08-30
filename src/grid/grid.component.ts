import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  OnChanges,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { FormioLoader } from '../components/loader/formio.loader';
import { FormioAlerts } from '../components/alerts/formio.alerts';
import { assign, each, get } from 'lodash';
import { Formio } from 'formiojs';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
import { GridFooterComponent } from './GridFooterComponent';
import FormComponents from './form/index';
import SubmissionComponents from './submission/index';

@Component({
  selector: 'formio-grid',
  styleUrls: ['./grid.component.scss'],
  templateUrl: './grid.component.html'
})
export class FormioGridComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() src?: string;
  @Input() onForm?: Promise<any>;
  @Input() query?: any;
  @Input() refresh?: EventEmitter<object>;
  @Input() gridType?: string;
  @Input() components?: any;
  @Input() formio?: Formio;
  @Output() rowSelect: EventEmitter<object>;
  @Output() rowAction: EventEmitter<object>;
  @Output() createItem: EventEmitter<any>;
  @Output() error: EventEmitter<any>;
  @ViewChild('headerTemplate', {read: ViewContainerRef}) headerElement: ViewContainerRef;
  @ViewChild('bodyTemplate', {read: ViewContainerRef}) bodyElement: ViewContainerRef;
  @ViewChild('footerTemplate', {read: ViewContainerRef}) footerElement: ViewContainerRef;

  public page = 0;
  public isLoading = false;
  public initialized = false;
  public header: GridHeaderComponent;
  public body: GridBodyComponent;
  public footer: GridFooterComponent;

  constructor(
    public loader: FormioLoader,
    public alerts: FormioAlerts,
    private resolver: ComponentFactoryResolver
  ) {
    this.rowSelect = new EventEmitter();
    this.rowAction = new EventEmitter();
    this.createItem = new EventEmitter();
    this.error = new EventEmitter();
    this.loader.loading = true;
  }

  createComponent(property, component) {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = property.createComponent(factory);
    return componentRef.instance;
  }

  loadGrid(src?: string) {
    // If no source is provided, then skip.
    if (!src && !this.formio) {
      return;
    }
    // Do not double load.
    if (this.formio && this.src && (src === this.src)) {
      return;
    }

    if (src) {
      this.src = src;
      this.formio = new Formio(this.src, { formOnly: true });
    }

    // Load the header.
    this.header.load(this.formio).then(() => this.setPage(0));
  }

  ngOnInit() {
    // Create our components.
    const comps = this.components || ((this.gridType === 'form') ? FormComponents : SubmissionComponents);

    this.header = this.createComponent(this.headerElement, comps.header);
    this.header.sort.subscribe(header => this.sortColumn(header));

    this.body = this.createComponent(this.bodyElement, comps.body);
    this.body.header = this.header;
    this.body.rowSelect.subscribe(row => this.rowSelect.emit(row));
    this.body.rowAction.subscribe(action => this.rowAction.emit(action));

    this.footer = this.createComponent(this.footerElement, comps.footer);
    this.footer.header = this.header;
    this.footer.body = this.body;
    this.footer.pageChanged.subscribe(page => this.pageChanged(page));
    this.footer.createItem.subscribe(item => this.createItem.emit(item));
  }

  ngOnChanges(changes: any) {
    if (this.initialized && changes.src && changes.src.currentValue) {
      this.loadGrid(changes.src.currentValue);
    }
  }

  ngAfterViewInit() {
    this.alerts.setAlerts([]);
    this.query = this.query || {};
    if (this.refresh) {
      this.refresh.subscribe((query: object) => this.refreshGrid(query));
    }

    // Load the grid.
    this.loadGrid(this.src);
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
    this.body.load(this.formio, this.query).then(info => {
      this.loading = false;
      this.initialized = true;
    });
  }

  setPage(num = -1) {
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

  sortColumn(header: any) {
    // Reset all other column sorts.
    each(this.header.headers, (col: any) => {
      if (col.key !== header.key) {
        col.sort = '';
      }
    });
    switch (header.sort) {
      case 'asc':
        header.sort = 'desc';
        this.query.sort = '-' + header.key;
        break;
      case 'desc':
        header.sort = '';
        delete this.query.sort;
        break;
      case '':
        header.sort = 'asc';
        this.query.sort = header.key;
        break;
    }
    this.refreshGrid();
  }

  pageChanged(page: any) {
    this.setPage(page.page - 1);
  }
}
