import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';

@Component({
    template: '<formio *ngIf="service.form && service.resource" [form]="service.form" [submission]="service.resource" (submit)="onSubmit($event)"></formio>'
})
export class FormioResourceEditComponent {
    constructor(
        private service: FormioResourceService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSubmit(submission: any) {
        let edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit).then(() => {
            this.router.navigate(['../', 'view'], {relativeTo: this.route});
        });
    }
}
