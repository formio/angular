import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import {FormioGridComponent} from '../../grid/grid.component';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
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
    const currentPage = +localStorage.getItem('currentPage') || 1;
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
