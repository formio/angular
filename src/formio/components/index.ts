import { TextField } from './textfield';
import { Button } from './button';
import { Columns } from './columns';
import { FormioTemplate } from '../formio';
export function FORMIO_COMPONENTS(template: FormioTemplate) {
    return [
        TextField(template),
        Button(template),
        Columns(template)
    ];
}