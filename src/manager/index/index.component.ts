import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';

@Component({
  templateUrl: './index.component.html'
})
export class FormManagerIndexComponent implements OnInit {
  public gridQuery: any;
  public refreshGrid: EventEmitter<object>;
  @ViewChild('search') search: ElementRef;
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormManagerConfig
  ) {
    this.gridQuery = {tags: this.config.tag, type: 'form'};
    this.refreshGrid = new EventEmitter();
  }

  ngOnInit() {
    this.service.reset();
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
    this.router.navigate([row._id, 'view'], { relativeTo: this.route });
  }

  onCreateItem() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
