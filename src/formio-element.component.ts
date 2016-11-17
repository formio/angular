import {
    Component,
    Input,
    EventEmitter,
    OnInit,
    Compiler,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormioComponents } from './components/components';
import { BaseComponent } from './components/base';
import { FormioEvents } from './formio.common';

@Component({
    selector: 'formio-element',
    template: '<div #formioElement></div>'
})
export class FormioElement implements OnInit {
    @Input() component: BaseComponent<any>;
    @Input() form: FormGroup;
    @Input() submission: FormGroup;
    @Input() data: any;
    @Input() label: string | boolean;
    @Input() events: FormioEvents;
    @Input() render: EventEmitter<any>;
    @ViewChild('formioElement', { read: ViewContainerRef }) element: ViewContainerRef;
    constructor(private compiler: Compiler) {}
    ngOnInit() {
        // Get the element.
        FormioComponents.element(this.component.settings.type, this.compiler).then(factory => {
            if (!this.element) {
                return;
            }
            let cmpRef = this.element.createComponent<FormioElement>(factory);
            this.component.label = this.label;

            // Set the value.
            if (
                (this.component.control instanceof FormControl) &&
                this.data &&
                this.data.hasOwnProperty(this.component.settings.key)
            ) {
                var data = this.data[this.component.settings.key];
                if (data instanceof Array) {
                    (<FormControl>this.component.control).setValue(data[this.component.index]);
                }
                else {
                    (<FormControl>this.component.control).setValue(data);
                }
            }
            cmpRef.instance.component = this.component;
            cmpRef.instance.form = this.form;
            cmpRef.instance.submission = this.submission;
            cmpRef.instance.data = this.data;
            cmpRef.instance.render = this.render;
            cmpRef.instance.events = this.events;
        });
    }
}
