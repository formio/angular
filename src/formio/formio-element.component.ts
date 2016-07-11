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
import { BaseOptions } from './components/base';

@Component({
    selector: 'formio-element',
    template: '<div #formioElement></div>'
})
export class FormioElement<T> extends Type implements OnInit {
    @Input() component: BaseOptions<T>;
    @Input() form: FormGroup;
    @Output() elementAdd: EventEmitter<any> = new EventEmitter();
    @ViewChild('formioElement', { read: ViewContainerRef }) element: ViewContainerRef;
    constructor(private resolver: ComponentResolver) {
        super();
    }
    ngOnInit() {
        let component = FormioComponents.component(this.component.type,  this.resolver);
        if (!component) {
            return;
        }

        component.then(cmpFactory => {
            let cmpRef = this.element.createComponent(cmpFactory);
            cmpRef.instance.component = this.component;
            cmpRef.instance.form = this.form;
            this.elementAdd.emit(cmpRef);
        });
    }
}