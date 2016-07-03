import {
    ComponentMetadata
} from '@angular/core'

export interface ComponentOptions<T> {
    value?: T,
    key?: string,
    inputType?: string,
    label?: string,
    required?: boolean
}

export class ComponentBase<T> {
    type: string;
    component: ComponentMetadata;
    settings: ComponentOptions<T>;
    constructor(type: string, component: {}, settings: ComponentOptions<T> = {}) {
        this.type = type;
        this.component = new ComponentMetadata(component);
        this.settings = settings;
    }
}