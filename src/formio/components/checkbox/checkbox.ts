import { Input, OnInit } from '@angular/core';
import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

/**
 * The CheckBoxValidation interface.
 */
export interface CheckBoxOptions extends BaseOptions<string> {
    inputType?: string,
    defaultValue?: string,
    hideLabel?: boolean
}

export class CheckBoxComponent extends BaseComponent<CheckBoxOptions> {

}

export class CheckBoxElement extends BaseElement implements OnInit {
    @Input() component: CheckBoxComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function CheckBox(template:FormioTemplate) {
    FormioComponents.register('checkbox', CheckBoxComponent, CheckBoxElement, {
        template: template.components.checkbox
    });
    return CheckBoxElement;
}
