import { BaseComponent, BaseOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

export function Button(template: FormioTemplate) {
    class _Button extends BaseComponent<BaseOptions<boolean>> {
        constructor() {
            super();
        }
    }
    FormioComponents.register('button', _Button, {
        template: template.components.button
    });
    return _Button;
}
