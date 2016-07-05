import { OnInit, Injectable } from '@angular/core';
import { BaseComponent } from '../base';
import { FormioComponents } from '../components';

@Injectable()
export class TextField extends BaseComponent implements OnInit {
    constructor() {
        super();
    }
    ngOnInit() {
        this.component.inputType = 'text';
    }
}

FormioComponents.register('textfield', TextField, {
    selector: 'formio-textfield',
    template: require('./textfield.html')
});
