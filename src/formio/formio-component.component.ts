import {
    Component,
    ChangeDetectorRef,
    Input,
    Type,
    OnInit,
    ComponentResolver,
    ViewContainerRef,
    ViewChildren,
    QueryList
} from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponents } from './components/components';
import { FormioRegisterTemplate } from './formio.component';
import { FormioTemplate } from './formio';
import { BaseOptions, BaseComponent } from './components/base';

@Component({
    selector: 'formio-component',
    template: '<div></div>',
    directives: [REACTIVE_FORM_DIRECTIVES],
    providers: [FormioComponents]
})
export class FormioComponent<T> extends Type implements OnInit {
    instances: Array<BaseComponent<any>> = [];
    @Input() component: BaseOptions<T>;
    @Input() form: FormGroup;
    @ViewChildren('formioElements', { read: ViewContainerRef }) elements: QueryList<ViewContainerRef>;
    constructor(private resolver: ComponentResolver, private ref: ChangeDetectorRef) {
        super();
    }
    ngOnInit() {
        let component = FormioComponents.component(this.component.type,  this.resolver);
        if (!component) {
            return;
        }

        component.then(cmpFactory => {
            this.elements.forEach((viewRef: ViewContainerRef) => {
                let cmpRef = viewRef.createComponent(cmpFactory);
                this.instances.push(cmpRef.instance);
                cmpRef.instance.component = this.component;
                cmpRef.instance.form = this.form;
                if (this.component.input && this.component.key) {
                    let control = cmpRef.instance.getFormControl();
                    this.form.addControl(this.component.key, control);
                }
            });
        });
    }
    addAnother() {

    }
    get errors(): Array<string> {
        if (!this.component.input) {
            return [];
        }
        if (!this.form.controls.hasOwnProperty(this.component.key)) {
            return [];
        }
        if (this.form.controls[this.component.key].pristine) {
            return [];
        }
        if (this.form.controls[this.component.key].valid) {
            return [];
        }
        let errors: Array<string> = [];
        for (let type in this.form.controls[this.component.key].errors) {
            this.instances.forEach((instance: BaseComponent<any>) => {
                let error = instance.getError(type, this.form.controls[this.component.key].errors[type]);
                if (error) {
                    errors.push(error);
                }
            });
        }
        return errors;
    }
}

export function FormioComponentRegister(template: FormioTemplate) {
    FormioRegisterTemplate(FormioComponent, template.formio_component);
    return FormioComponent;
}