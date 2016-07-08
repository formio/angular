import { TextField } from './textfield';
import { Button } from './button';
import { FormioTemplate } from '../formio';
export function FORMIO_COMPONENTS(template: FormioTemplate) {
    return [
        TextField(template),
        Button(template)
    ];
}