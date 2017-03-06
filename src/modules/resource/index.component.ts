import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';

@Component({
    template:
        '<formio-grid [src]="service.formUrl" [onForm]="service.formLoaded" (select)="onSelect($event)"></formio-grid>' +
        '<button class="btn btn-primary" *ngIf="service.form" routerLink="new">New {{ service.form.title }}</button>'
})
export class FormioResourceIndexComponent {
    constructor(
        private service: FormioResourceService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSelect(row:any) {
        this.router.navigate([row._id, 'view'], {relativeTo: this.route});
    }
}
