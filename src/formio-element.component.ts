import {
    Component,
    Input,
    Output,
    EventEmitter,
    Type,
    OnInit,
    ComponentResolver,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioComponents } from './components/components';
import { BaseComponent } from './components/base';
import { FormioEvents } from './formio.common';

@Component({
    selector: 'formio-element',
    template: '<div #formioElement></div>'
})
export class FormioElement extends Type implements OnInit {
    @Input() component: BaseComponent<any>;
    @Input() form: FormGroup;
    @Input() label: string | boolean;
    @Input() events: FormioEvents;
    @Output() render: EventEmitter<any> = new EventEmitter();
    @ViewChild('formioElement', { read: ViewContainerRef }) element: ViewContainerRef;
    constructor(private resolver: ComponentResolver) {
        super();
    }
    ngOnInit() {
        // Get the element.
        let element = FormioComponents.element(this.component.settings.type,  this.resolver);
        if (!element) {
            return;
        }

        element.then(cmpFactory => {
            if (!this.element) {
                return;
            }
            let cmpRef = this.element.createComponent(cmpFactory);
            this.component.label = this.label;
            cmpRef.instance.component = this.component;
            cmpRef.instance.form = this.form;
            cmpRef.instance.render = this.render;
            cmpRef.instance.events = this.events;
        });
    }
}