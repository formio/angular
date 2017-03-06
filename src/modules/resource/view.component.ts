import { Component } from '@angular/core';
import { FormioResourceService } from './resource.service';

@Component({
    template: '<formio *ngIf="service.form && service.resource" [form]="service.form" [submission]="service.resource" [readOnly]="true"></formio>'
})
export class FormioResourceViewComponent {
    constructor(private service: FormioResourceService) {}
}
