import { Component, ElementRef, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormioCore as Formio } from '@formio/js';

@Component({
    selector: 'formio-builder',
    template: '<div #formio></div>'
})
export class FormioBuilder implements AfterViewInit {
    @ViewChild('formio') element: ElementRef;
    @Input() form?: Object | null;
    @Input() options?: Object = {};
    @Output() ready = new EventEmitter<Formio>();
    @Output() error = new EventEmitter<any>();
    ngAfterViewInit(): void {
        Formio.builder(this.element.nativeElement, this.form, this.options).then((builder) => {
            this.ready.emit(builder);
        }).catch((err) => this.error.emit(err));
    }
}