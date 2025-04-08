import {Component, ElementRef, Input, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {Form, FormBuilder, Webform} from '@formio/js';
import WebformBuilder from '@formio/js/lib/cjs/WebformBuilder';

@Component({
    selector: 'formio-builder',
    template: '<div #formio></div>',
    standalone: false
})
export class FormioBuilder implements AfterViewInit, OnDestroy {
    @ViewChild('formio') element: ElementRef;
    @Input() form?: Form['options'] | null;
    @Input() options?: FormBuilder['options'] = {};
    @Output() change = new EventEmitter<any>();
    @Output() ready = new EventEmitter<any>();
    @Output() error = new EventEmitter<any>();
    public builder: FormBuilder;
    public componentAdding = false;
    get instance(): WebformBuilder {
        return this.builder.instance;
    }
    ngAfterViewInit(): void {
        this.builder = new FormBuilder(this.element.nativeElement, this.form, this.options);
        this.builder.ready.then(() => {
            this.instance.on('addComponent', (component, parent, path, index, isNew) => {
                if (isNew) {
                    this.componentAdding = true;
                } else {
                    this.change.emit({
                        type: 'addComponent',
                        builder: this.instance,
                        form: this.instance.schema,
                        component: component,
                        parent: parent,
                        path: path,
                        index: index
                    });
                    this.componentAdding = false;
                }
            });
            this.instance.on('saveComponent', (component, original, parent, path, index, isNew) => {
                this.change.emit({
                    type: this.componentAdding ? 'addComponent' : 'saveComponent',
                    builder: this.instance,
                    form: this.instance.schema,
                    component: component,
                    originalComponent: original,
                    parent: parent,
                    path: path,
                    index: index,
                    isNew: isNew || false
                });
                this.componentAdding = false;
            });
            this.instance.on('removeComponent', (component, parent, path, index) => {
                this.change.emit({
                    type: 'deleteComponent',
                    builder: this.instance,
                    form: this.instance.schema,
                    component: component,
                    parent: parent,
                    path: path,
                    index: index
                });
            });
            this.ready.emit(this.instance);
        }).catch((err) => this.error.emit(err));
    }

  ngOnDestroy(): void {
      this.instance.destroy(true);
  }
}
