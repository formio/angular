import { ComponentBase, ComponentOptions } from '../base';
export class TextField extends ComponentBase<string> {
    constructor(options: ComponentOptions<string> = {}) {
        super('textfield', {
            selector: 'formio-textfield',
            template: require('./textfield.html')
        }, options);
        this.settings.inputType = 'text';
    }
}