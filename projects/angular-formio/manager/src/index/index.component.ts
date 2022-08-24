import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { FormioGridComponent } from '@heybaton/formio-ng/grid';
import { debounce } from 'lodash';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FormManagerIndexComponent implements OnInit {
  @ViewChild(FormioGridComponent, {static: false}) formGrid: FormioGridComponent;
  public gridQuery: any;
  public search = '';
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormManagerConfig
  ) {
    this.gridQuery = {tags: this.config.tag, type: 'form', sort: 'title'};
    this.onSearch = debounce(this.onSearch, 300);
  }

  loadGrid() {
    this.search = localStorage.getItem('searchInput');
    this.gridQuery = JSON.parse(localStorage.getItem('query')) || this.gridQuery;
    const currentPage = +localStorage.getItem('currentPage') || 0;
    this.formGrid
      .refreshGrid(this.gridQuery)
      .then(() => this.formGrid.setPage(currentPage - 1));
  }

  ngOnInit() {
    this.gridQuery = {tags: this.config.tag, type: 'form', sort: 'title'};
    this.service.reset();
    this.service.ready.then(() => {
      this.loadGrid();
      this.formGrid.footer.pageChanged.subscribe(page => {
        localStorage.setItem('currentPage', page.page);
      });
    });
  }

  onSearch(event?: KeyboardEvent) {
    const searchInput = this.search;
    if (searchInput.length > 0) {
      this.gridQuery.skip = 0;
      this.gridQuery.title__regex = '/' + searchInput + '/i';
      this.gridQuery.title__regex = '/' + searchInput.trim() + '/i';
    } else {
      delete this.gridQuery.title__regex;
    }
    localStorage.setItem('query', JSON.stringify(this.gridQuery));
    localStorage.setItem('searchInput', this.search);
    this.formGrid.pageChanged({page: 1, itemPerPage: this.gridQuery.limit});
    this.formGrid.refreshGrid(this.gridQuery);
  }

  clearSearch() {
    this.gridQuery = {tags: this.config.tag, type: 'form', sort: 'title'};
    localStorage.removeItem('query');
    localStorage.removeItem('searchInput');
    localStorage.removeItem('currentPage');
    this.search = '';
    this.formGrid.pageChanged({page: 1});
    this.formGrid.query = {};
    this.formGrid.refreshGrid({tags: this.config.tag, type: 'form', sort: 'title'});
  }

  onAction(action: any) {
    this.service.form = null; // Reset previous form data
    this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
  }

  onSelect(row: any) {
    this.router.navigate([row._id], { relativeTo: this.route });
  }

  onCreateItem() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
