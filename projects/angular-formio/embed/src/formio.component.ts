import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { FormioCore as Formio } from '@formio/js';

@Component({
    selector: 'formio',
    template: '<div #formio></div>'
})
export class FormioComponent implements AfterViewInit {
    @Input() src?: string;
    @Input() form?: Object | null;
    @Input() submission?: Object | null;
    @Input() options?: Object = {};
    @Output() ready = new EventEmitter<Formio>();
    @Output() submit = new EventEmitter<object>();
    @Output() error = new EventEmitter<any>();
    @ViewChild('formio') element: ElementRef;
    ngAfterViewInit(): void {
        Formio.createForm(this.element.nativeElement, this.src || this.form, this.options).then((form) => {
            if (this.submission) {
                form.submission = this.submission;
            }
            this.ready.emit(form);
            form.on('submit', (submission) => this.submit.emit(submission));
            form.on('error', (err) => this.error.emit(err));
        }).catch((err) => this.error.emit(err));
    }
}