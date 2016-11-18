import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { OnInit } from '@angular/core';

export interface SelectBoxOptions extends BaseOptions<string> {
    inputType?: string,
    type?: string,
    inline?: boolean,
    value?: string,
    values?: Array<{}>,
    customClass?:string
}

export class SelectBoxComponent extends BaseComponent<SelectBoxOptions> {}
export class SelectBoxElement extends BaseElement<SelectBoxComponent> implements OnInit {
    public submitValue: Object = {};
    ngOnInit() {
        if (this.component.data[this.component.settings.key] != null) {
            this.submitValue = this.component.data[this.component.settings.key];
        }
        else {
            this.component.settings.values.forEach((item: any) => {
                this.submitValue[item.value] = false;
            });
        }
    }
    onChange(option: any, isChecked: boolean) {
        this.submitValue[option.value] = isChecked;
        this.component.setValue(this.submitValue);
    }
}

export function SelectBoxField(template:FormioTemplate) {
    FormioComponents.register('selectboxes', SelectBoxComponent, SelectBoxElement, template.components.selectboxes);
    return SelectBoxElement;
}
