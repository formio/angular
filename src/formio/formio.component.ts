import 'reflect-metadata';
import { Component, Input, Output, Type, EventEmitter, OnInit }  from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponentsComponent } from './formio-components.component';
import { FormioTemplate, RegisterTemplate } from './formio.template';
import { FormioService, FormioForm } from './formio.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * The <formio> component.
 */
@Component({
    selector: 'formio',
    template: '<div></div>',
    directives: [FormioComponentsComponent, REACTIVE_FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
export class FormioComponent extends Type implements OnInit {
    @Input() form: FormioForm = null;
    @Input() src: string;
    @Input() service: FormioService;
    @Output() render: EventEmitter<any> = new EventEmitter();
    @Output() submit: EventEmitter<any> = new EventEmitter();
    public formGroup: FormGroup = new FormGroup({});
    public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor() {
        super();
    }
    ngOnInit() {
        if (this.form) {
            this.ready.next(true);
        }
        else if (this.src && !this.service) {
            this.service = new FormioService(this.src);
            this.service.loadForm().subscribe((form: FormioForm) => {
                if (form && form.components) {
                    this.form = form;
                    this.ready.next(true);
                }
            });
        }
    }
    onRender() {
        this.render.emit(true);
    }
    onSubmit() {
        let submission = {data: this.formGroup.value};
        if (this.service) {
            this.service.submit(submission).subscribe((sub: {}) => {
                this.submit.emit(sub);
            });
        }
    }
}

/**
 * Form.io component registration method. This is used to dynamically load a template
 * into a component based on which template they wish to associate with Form.io
 *
 * @param template - The FormioTemplate object.
 * @returns {Formio}
 * @constructor
 */
export function FormioRegister(template: FormioTemplate) {
    RegisterTemplate(FormioComponent, template.formio, template.styles);
    return FormioComponent;
}