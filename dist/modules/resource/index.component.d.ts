import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
import { FormioResourceConfig } from './resource.config';
export declare class FormioResourceIndexComponent {
    private service;
    private route;
    private router;
    private config;
    private gridSrc;
    private gridQuery;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router, config: FormioResourceConfig);
    onSelect(row: any): void;
}
