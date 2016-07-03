export interface ComponentOptions<T> {
    value?: T,
    key?: string,
    inputType?: string,
    label?: string,
    required?: boolean
}

export class ComponentBase<T> {
    type: string;
    settings: ComponentOptions<T>;
    constructor(type: string, settings: ComponentOptions<T> = {}) {
        this.type = type;
        this.settings = settings;
    }
}