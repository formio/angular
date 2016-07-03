import { ComponentBase, ComponentOptions } from '../base';

export interface SelectOptionItem {
    key: string,
    value: string
}

export interface SelectOptions extends ComponentOptions<string> {
    options?: SelectOptionItem[]
}

export class Select extends ComponentBase<string> {
    options: {key: string, value: string}[] = [];
    constructor(options: SelectOptions = {}) {
        super('select', options);
        this.options = options['options'] || [];
    }
}