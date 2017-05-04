import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
import { FormioResourceConfig } from './resource.config';

@Component({
    template: '<formio [form]="service.form" [submission]="service.resource" [refresh]="service.refresh" [hideComponents]="config.parents" (submit)="onSubmit($event)"></formio>'
})
export class FormioResourceEditComponent {
    constructor(
        public service: FormioResourceService,
        public route: ActivatedRoute,
        public router: Router,
        public config: FormioResourceConfig
    ) {}

    onSubmit(submission: any) {
        let edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit).then(() => {
            this.router.navigate(['../', 'view'], {relativeTo: this.route});
        });
    }
}
