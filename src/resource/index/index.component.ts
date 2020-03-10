import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public createText: String;
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.gridQuery = {};
    this.service.setContext(this.route);
    this.service.formLoaded.then(() => {
      if (
        this.service &&
        this.config.parents &&
        this.config.parents.length
      ) {
        this.service.loadParents().then((parents: any) => {
          each(parents, (parent: any) => {
            if (parent && parent.filter) {
              this.gridQuery['data.' + parent.name + '._id'] =
                parent.resource._id;
            }
          });

          // Set the source to load the grid.
          this.gridSrc = this.service.formUrl;
          this.createText = `New ${this.service.form.title}`;
        });
      } else if (this.service.formUrl) {
        this.gridSrc = this.service.formUrl;
        this.createText = `New ${this.service.form.title}`;
      }

      this.cdr.detectChanges();
    });
  }

  onSelect(row: any) {
    this.router.navigate([row._id, 'view'], { relativeTo: this.route });
  }

  onCreateItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
