import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormManagerConfig, FormManagerService} from '../../manager';

@Component({
  templateUrl: './index.component.html'
})
export class UserManagerIndexComponent implements OnInit {
  public gridQuery: any;
  public refreshGrid: EventEmitter<object>;
  @ViewChild('search') search: ElementRef;
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormManagerConfig
  ) {
    this.gridQuery = {tags: this.config.tag, type: 'resource'};
    this.refreshGrid = new EventEmitter();
  }

  ngOnInit() {
    this.service.reset(this.route);
  }

  onSearch() {
    const searchInput = this.search.nativeElement.value;
    if (searchInput.length > 0) {
      this.gridQuery.skip = 0;
      this.gridQuery.title__regex = '/' + searchInput + '/i';
    } else {
      delete this.gridQuery.title__regex;
    }
    this.refreshGrid.emit(this.gridQuery);
  }

  onAction(action: any) {
    this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
  }

  onSelect(row: any) {
    this.router.navigate([row.data.path, 'view'], { relativeTo: this.route });
  }

  onCreateItem() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
