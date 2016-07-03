import { ComponentBase, ComponentOptions } from '../base';
import { Component, Input, Type } from '@angular/core';

@Component({
    selector: 'formio-textfield',
    template: require('./textfield.html')
})
export class TextFieldComponent extends Type {
    @Input component: ComponentBase<string>;
}

export class TextField extends ComponentBase<string> {
    constructor(options: ComponentOptions<string> = {}) {
        super('textfield', options);
        this.settings.inputType = 'text';
    }

    static component() {
        return TextFieldComponent;
    }
}