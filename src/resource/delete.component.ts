import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';

@Component({
    template:
        '<h3>Are you sure you wish to delete this record?</h3>' +
        '<div class="btn-toolbar">' +
            '<button (click)="onDelete()" class="btn btn-danger">Yes</button>' +
            '<button (click)="onCancel()" class="btn btn-danger">No</button>' +
        '</div>'
})
export class FormioResourceDeleteComponent {
    constructor(
        public service: FormioResourceService,
        public route: ActivatedRoute,
        public router: Router
    ) {}

    onDelete() {
        this.service.remove().then(() => {
            this.router.navigate(['../../'], {relativeTo: this.route});
        });
    }

    onCancel() {
        this.router.navigate(['../', 'view'], {relativeTo: this.route});
    }
}
