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
  ComponentFactoryResolver,
  ChangeDetectorRef
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
import {FormioPromiseService} from '../formio-promise.service';

@Component({
  selector: 'formio-grid',
  styleUrls: ['./grid.component.scss'],
  templateUrl: './grid.component.html'
})
export class FormioGridComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() src?: string;
  @Input() items?: Array<any>;
  @Input() onForm?: Promise<any>;
  @Input() query?: any;
  @Input() refresh?: EventEmitter<object>;
  @Input() columns?: Array<any>;
  @Input() gridType?: string;
  @Input() size?: number;
  @Input() components?: any;
  @Input() formio?: FormioPromiseService;
  @Input() createText: String;
  @Input() isActionAllowed: any;
  @Output() select: EventEmitter<object>;
  @Output() rowSelect: EventEmitter<object>;
  @Output() rowAction: EventEmitter<object>;
  @Output() createItem: EventEmitter<any>;
  @Output() error: EventEmitter<any>;
  @ViewChild('headerTemplate', {read: ViewContainerRef, static: true}) headerElement: ViewContainerRef;
  @ViewChild('bodyTemplate', {read: ViewContainerRef, static: true}) bodyElement: ViewContainerRef;
  @ViewChild('footerTemplate', {read: ViewContainerRef, static: true}) footerElement: ViewContainerRef;

  public page = 0;
  public isLoading = false;
  public initialized = false;
  public header: GridHeaderComponent;
  public body: GridBodyComponent;
  public footer: GridFooterComponent;

  constructor(
    public loader: FormioLoader,
    public alerts: FormioAlerts,
    private resolver: ComponentFactoryResolver,
    private ref: ChangeDetectorRef
  ) {
    this.select = this.rowSelect = new EventEmitter();
    this.rowAction = new EventEmitter();
    this.createItem = new EventEmitter();
    this.error = new EventEmitter();
    this.loader.setLoading(true);
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
      this.formio = new FormioPromiseService(this.src, { formOnly: true });
    }

    // Load the header.
    this.header.load(this.formio, {}, this.columns)
      .then(() => this.setPage(0))
      .catch(error => this.onError(error));
  }

  ngOnInit() {
    // Create our components.
    const comps = this.components || ((this.gridType === 'form') ? FormComponents : SubmissionComponents);

    this.header = this.createComponent(this.headerElement, comps.header);
    this.header.actionAllowed = this.actionAllowed.bind(this);
    this.header.sort.subscribe(header => this.sortColumn(header));

    this.body = this.createComponent(this.bodyElement, comps.body);
    this.body.header = this.header;
    this.body.actionAllowed = this.actionAllowed.bind(this);
    this.body.rowSelect.subscribe(row => this.rowSelect.emit(row));
    this.body.rowAction.subscribe(action => this.rowAction.emit(action));

    this.footer = this.createComponent(this.footerElement, comps.footer);
    this.footer.header = this.header;
    this.footer.body = this.body;
    this.footer.actionAllowed = this.actionAllowed.bind(this);
    this.footer.createText = this.createText;
    this.footer.size = this.size;
    this.footer.pageChanged.subscribe(page => this.pageChanged(page));
    this.footer.createItem.subscribe(item => this.createItem.emit(item));
  }

  ngOnChanges(changes: any) {
    if (this.initialized) {
      if (
        (changes.src && changes.src.currentValue) ||
        (changes.formio && changes.formio.currentValue)
      ) {
        this.loadGrid(changes.src.currentValue);
      }

      if (changes.items && changes.items.currentValue) {
        this.refreshGrid();
      }
    }

    if (this.footer &&
        (changes.createText && changes.createText.currentValue)) {
      this.footer.createText = changes.createText.currentValue;
    }
  }

  ngAfterViewInit() {
    this.alerts.setAlerts([]);
    this.query = this.query || {};
    if (this.refresh) {
      this.refresh.subscribe((query: object) => this.refreshGrid(query));
    }
    this.loadGrid(this.src);
    this.initialized = true;
    this.ref.detectChanges();
  }

  set loading(_loading: boolean) {
    this.isLoading = _loading;
    this.loader.setLoading(_loading);
  }

  actionAllowed(action) {
    if (this.isActionAllowed) {
      return this.isActionAllowed(action);
    } else {
      return true;
    }
  }

  onError(error: any) {
    this.loading = false;
    this.error.emit(error);
    this.alerts.setAlert({
      type: 'danger',
      message: error
    });
  }

  refreshGrid(query?: any) {
    this.alerts.setAlerts([]);
    this.query = query || this.query;
    if (!this.query.hasOwnProperty('limit')) {
      this.query.limit = 10;
    }
    if (!this.query.hasOwnProperty('skip')) {
      this.query.skip = 0;
    }
    this.loading = true;
    this.ref.detectChanges();
    Formio.cache = {};
    let loader = null;
    if (this.items) {
      loader = Promise.resolve(this.body.setRows(this.query, this.items));
    } else {
      loader = this.body.load(this.formio, this.query);
    }

    loader.then(info => {
      this.loading = false;
      this.initialized = true;
      this.ref.detectChanges();
    }).catch(error => this.onError(error));
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
