import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Formio } from '@formio/js/lib/cjs/Embed';
import { FormioAppConfig } from './formio.config';

@Component({
    selector: 'formio',
    template: '<div #formio></div>'
})
export class FormioComponent implements AfterViewInit{
    @Input() src?: string;
    @Input() form?: Object;
    @Input() submission?: Object;
    @Input() options?: Object = {};
    @Output() ready = new EventEmitter<Formio>();
    @Output() error = new EventEmitter<any>();
    @ViewChild('formio') element: ElementRef;
    constructor(public appConfig: FormioAppConfig) {
        Formio.setBaseUrl(this.appConfig.apiUrl);
        Formio.setProjectUrl(this.appConfig.appUrl);
    }
    ngAfterViewInit(): void {
        Formio.createForm(this.element.nativeElement, this.src || this.form, this.options).then((form) => {
            if (this.submission) {
                form.submission = this.submission;
            }
            this.ready.emit(form);
        }).catch((err) => this.error.emit(err));
    }
}