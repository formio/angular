import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { FormioCore as Formio, Webform } from '@formio/js';
import { Form, Submission } from '@formio/core/types';

@Component({
    selector: 'formio',
    template: '<div #formio></div>'
})
export class FormioComponent implements AfterViewInit {
    @Input() src?: string;
    @Input() form?: Form | null;
    @Input() submission?: Submission | null;
    @Input() url?: string;
    @Input() options?: Webform['options'] = {};
    @Output() ready = new EventEmitter<Webform>();
    @Output() submit = new EventEmitter<object>();
    @Output() error = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();
    @ViewChild('formio') element: ElementRef;
    public instance: Webform;
    ngAfterViewInit(): void {
        Formio.createForm(this.element.nativeElement, this.src || this.form, this.options).then((form: Webform) => {
            this.instance = form;
            if (this.url) {
                form.url = this.url;
            }
            if (this.submission) {
                form.submission = this.submission;
            }
            this.ready.emit(form);
            form.on('submit', (submission) => this.submit.emit(submission));
            form.on('error', (err) => this.error.emit(err));
            form.on('change', (event) => this.change.emit(event));
        }).catch((err) => this.error.emit(err));
    }
}
