import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import { each } from 'lodash';

@Component({
  templateUrl: './index.component.html'
})
export class FormioResourceIndexComponent implements OnInit {
  public gridSrc?: string;
  public gridQuery: any;
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig
  ) {}

  ngOnInit() {
    this.service.initialize();
    this.gridQuery = {};
    if (
      this.service &&
      this.service.onParents &&
      this.config.parents &&
      this.config.parents.length
    ) {
      // Wait for the parents to load before loading this grid.
      this.service.onParents.subscribe((parents: any) => {
        each(parents, (parent: any) => {
          if (parent) {
            this.gridQuery['data.' + parent.name + '._id'] =
              parent.resource._id;
          }
        });

        // Set the source to load the grid.
        this.gridSrc = this.service.formUrl;
      });
    } else if (this.service.formUrl) {
      this.gridSrc = this.service.formUrl;
    }
  }

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], { relativeTo: this.route });
  }
}
