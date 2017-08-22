import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
import { FormioResourceConfig } from './resource.config';

/* tslint:disable */
const _each = require('lodash/each');
/* tslint:enable */

@Component({
    template: require('./index.component.html').toString()
})
export class FormioResourceIndexComponent {
    public gridSrc: string;
    public gridQuery: any;
    constructor(
        public service: FormioResourceService,
        public route: ActivatedRoute,
        public router: Router,
        public config: FormioResourceConfig
    ) {
        this.service.initialize();
        this.gridQuery = {};
        if (this.config.parents && this.config.parents.length) {
            // Wait for the parents to load before loading this grid.
            this.service.onParents.subscribe((parents: any) => {
                _each(parents, (parent: any) => {
                    if (parent) {
                        this.gridQuery['data.' + parent.name + '._id'] = parent.resource._id;
                    }
                });

                // Set the source to load the grid.
                this.gridSrc = this.service.formUrl;
            });
        }
        else if (this.service.formUrl) {
            this.gridSrc = this.service.formUrl;
        }
    }

    onSelect(row:any) {
        this.router.navigate([row._id, 'view'], {relativeTo: this.route});
    }
}
