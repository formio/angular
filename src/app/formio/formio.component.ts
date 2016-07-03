import { Component, Input, OnInit, Type }  from '@angular/core';
import { FormControl, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormioComponent } from './formio-component.component';
import { ComponentBase } from './components/base';
@Component({
    selector: 'formio',
    template: require('./formio.component.html'),
    directives: [FormioComponent, REACTIVE_FORM_DIRECTIVES]
})
export class Formio extends Type implements OnInit {
    @Input() components: ComponentBase<any>[] = [];
    form: FormGroup;
    constructor() {
        super();
    }
    toFormGroup(components: ComponentBase<any>[] ) {
        let group: any = {};
        components.forEach(component => {
            group[component.settings.key] = component.settings.required ? new FormControl(component.settings.value || '', Validators.required)
                : new FormControl(component.settings.value || '');
        });
        return new FormGroup(group);
    }
    ngOnInit() {
        this.form = this.toFormGroup(this.components);
    }
    onSubmit() {
        console.log(this.form.value);
    }
}