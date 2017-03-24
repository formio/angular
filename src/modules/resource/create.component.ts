import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
import { FormioResourceConfig } from './resource.config';

@Component({
    styles: ['.back-button { font-size: 0.8em; }'],
    template:
        '<h3 *ngIf="service.form" style="margin-top:0;"><a routerLink="../" class="back-button"><span class="glyphicon glyphicon-chevron-left"></span></a> | New {{ service.form.title }}</h3>' +
        '<formio [form]="service.form" [submission]="service.resource" [refresh]="service.refresh" [hideComponents]="config.parents" (submit)="onSubmit($event)"></formio>'
})
export class FormioResourceCreateComponent {
    constructor(
        private service: FormioResourceService,
        private route: ActivatedRoute,
        private router: Router,
        private config: FormioResourceConfig
    ) {}

    onSubmit(submission: any) {
        this.service.save(submission).then(() => {
            this.router.navigate(['../', this.service.resource._id, 'view'], {relativeTo: this.route});
        });
    }
}
