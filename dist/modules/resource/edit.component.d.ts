import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
import { FormioResourceConfig } from './resource.config';
export declare class FormioResourceEditComponent {
    private service;
    private route;
    private router;
    private config;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router, config: FormioResourceConfig);
    onSubmit(submission: any): void;
}
