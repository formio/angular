import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
export declare class FormioResourceDeleteComponent {
    private service;
    private route;
    private router;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router);
    onDelete(): void;
    onCancel(): void;
}
