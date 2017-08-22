import { Component } from '@angular/core';
import { FormioResourceService } from './resource.service';
import { FormioResourceConfig } from './resource.config';

@Component({
    template: '<formio [form]="service.form" [submission]="service.resource" [hideComponents]="config.parents" [readOnly]="true"></formio>'
})
export class FormioResourceViewComponent {
    constructor(
        public service: FormioResourceService,
        public config: FormioResourceConfig
    ) {}
}
