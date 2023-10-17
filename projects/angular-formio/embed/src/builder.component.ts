import { Component, ElementRef, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Formio } from '@formio/js/lib/cjs/Embed';
import { FormioAppConfig } from './formio.config';

@Component({
    selector: 'formio-builder',
    template: '<div #formio></div>'
})
export class FormioBuilder implements AfterViewInit {
    @ViewChild('formio') element: ElementRef;
    @Input() form?: Object;
    @Input() options?: Object = {};
    @Output() ready = new EventEmitter<Formio>();
    @Output() error = new EventEmitter<any>();
    constructor(public appConfig: FormioAppConfig) {
        Formio.setBaseUrl(this.appConfig.apiUrl);
        Formio.setProjectUrl(this.appConfig.appUrl);
    }
    ngAfterViewInit() {
        Formio.builder(this.element.nativeElement, this.form, this.options).then((builder) => {
            this.ready.emit(builder);
        }).catch((err) => this.error.emit(err));
    }
}