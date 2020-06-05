import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import {FormioGridComponent} from '../../grid/grid.component';

@Component({
  template: "<div class=\"input-group mb-3\" *ngIf=\"config.includeSearch\"> <input type=\"text\" class=\"form-control\" [(ngModel)]=\"search\" (keydown.enter)=\"onSearch()\" placeholder=\"Search Forms\" aria-label=\"Search Forms\" aria-describedby=\"button-search\"> <span  *ngIf=\"search && search !== ''\" class=\"form-clear input-group-addon\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></span> <div class=\"input-group-append\"> <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-search\" (click)=\"onSearch()\"><i class=\"fa fa-search\"></i> Search</button> </div> </div> <formio-grid *ngIf=\"service.ready\" [formio]=\"service.formio\" [gridType]=\"'form'\" [query]=\"gridQuery\" [refresh]=\"refreshGrid\" [isActionAllowed]=\"service.actionAllowed\" (rowAction)=\"onAction($event)\" (rowSelect)=\"onSelect($event)\" (createItem)=\"onCreateItem()\" ></formio-grid> ",
  styles: [".form-clear { align-items: center; background: #cecece; border-radius: 50%; bottom: 8px; color: rgba(0, 0, 0, 0.3); cursor: pointer; display: flex; justify-content: center; height: 24px; position: absolute; right: 90px; top: 6px; width: 24px; z-index: 10; } .form-clear .fa { font-size: 16px; font-weight: 500; } "]
})
export class FormManagerIndexComponent implements OnInit {
  @ViewChild(FormioGridComponent, {static: false}) formGrid: FormioGridComponent;
  public gridQuery: any;
  public refreshGrid: EventEmitter<object>;
  public search = '';
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormManagerConfig
  ) {
    this.gridQuery = {tags: this.config.tag, type: 'form'};
    this.refreshGrid = new EventEmitter();
  }

  loadGrid() {
    this.search = localStorage.getItem('searchInput');
    this.gridQuery = JSON.parse(localStorage.getItem('query')) || this.gridQuery;
    const currentPage = +localStorage.getItem('currentPage') || 0;
    this.formGrid.refreshGrid(this.gridQuery);
    this.formGrid.setPage(currentPage);
  }

  ngOnInit() {
    this.gridQuery = {tags: this.config.tag, type: 'form'};
    this.service.reset();
    this.service.ready.then(() => {
      this.loadGrid();
      this.formGrid.footer.pageChanged.subscribe(page => {
        localStorage.setItem('currentPage', page.page);
      });
    });
  }

  onSearch() {
    const searchInput = this.search;
    if (searchInput.length > 0) {
      this.gridQuery.skip = 0;
      this.gridQuery.title__regex = '/' + searchInput + '/i';
    } else {
      delete this.gridQuery.title__regex;
    }
    localStorage.setItem('query', JSON.stringify(this.gridQuery));
    localStorage.setItem('searchInput', this.search);
    this.formGrid.pageChanged({page: 1, itemPerPage: this.gridQuery.limit});
    this.refreshGrid.emit(this.gridQuery);
  }

  clearSearch() {
    this.gridQuery = {tags: this.config.tag, type: 'form'};
    localStorage.removeItem('query');
    localStorage.removeItem('searchInput');
    localStorage.removeItem('currentPage');
    this.search = '';
    this.formGrid.pageChanged({page: 1});
    this.formGrid.query = {};
    this.formGrid.refreshGrid({tags: this.config.tag, type: 'form'});
  }

  onAction(action: any) {
    this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
  }

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], { relativeTo: this.route });
  }

  onCreateItem() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
