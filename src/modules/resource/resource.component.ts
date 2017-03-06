import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioResourceService } from './resource.service';
import { FormioLoaderStyles } from '../../formio.config';

@Component({
    styles: [
        'ul.nav.nav-tabs { margin-bottom: 20px; }',
        '.resource-back-icon { font-size: 1.2em; padding: 0.6em; }',
        ...FormioLoaderStyles
    ],
    template:
        '<ul class="nav nav-tabs">' +
            '<a routerLink="../" class="pull-left"><span class="glyphicon glyphicon-chevron-left resource-back-icon"></span></a>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="view">View</a></li>' +
            '<li role="presentation" routerLinkActive="active"><a routerLink="edit">Edit</a></li>' +
            '<li role="presentation pull-right" routerLinkActive="active"><a routerLink="delete"><span class="glyphicon glyphicon-trash"></span></a></li>' +
        '</ul>' +
        '<div *ngIf="isLoading" style="position:relative;height:200px;"><div class="formio-loader-wrapper"><div class="formio-loader"></div></div></div>' +
        '<router-outlet></router-outlet>'
})
export class FormioResourceComponent {
    isLoading: boolean = false;
    constructor(private service: FormioResourceService, private route: ActivatedRoute) {
        this.isLoading = true;
        this.service.loadResource(this.route).then(() => (this.isLoading = false));
    }
}
