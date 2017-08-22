import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';

@Component({
    styles: [
        'ul.nav.nav-tabs { margin-bottom: 20px; }',
        '.resource-back-icon { font-size: 1.2em; padding: 0.6em; }'
    ],
    template:
        '<ul class="nav nav-tabs">' +
            '<a routerLink="../" class="pull-left"><span class="glyphicon glyphicon-chevron-left resource-back-icon"></span></a>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="view">View</a></li>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="edit">Edit</a></li>' +
            '<li role="presentation pull-right" routerLinkActive="active"><a routerLink="delete"><span class="glyphicon glyphicon-trash"></span></a></li>' +
        '</ul>' +
        '<router-outlet></router-outlet>'
})
export class FormioResourceComponent {
    constructor(
        public service: FormioResourceService,
        public route: ActivatedRoute
    ) {
        this.service.initialize();
        this.service.loadResource(this.route);
    }
}
