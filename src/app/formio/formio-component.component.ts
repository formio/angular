import { Component, Input, Type, ComponentResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ComponentBase } from './components/base';
import { TextFieldComponent } from './components/textfield/textfield.component';
@Component({
    selector: 'formio-component',
    template: require('./formio-component.component.html'),
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class FormioComponent extends Type {
    @Input() component: ComponentBase<any>;
    @Input() form: FormGroup;
    @ViewChild("formioElement", { read: ViewContainerRef }) element: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef, private _cr: ComponentResolver) {
        super();
        this._cr.resolveComponent(TextFieldComponent).then(cmpFactory => {
            let cmpRef = this.element.createComponent(cmpFactory);
            cmpRef.instance.component = this.component;
            cmpRef.instance.form = this.form;
        });
    }
    get isValid() { return this.form.controls[this.component.settings.key].valid; }
}