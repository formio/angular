import { TextField } from './textfield';
import { Button } from './button';
import { Columns } from './columns';
import { Container } from './container';
import { FormioTemplate } from '../formio';
export function FORMIO_COMPONENTS(template: FormioTemplate) {
    return [
        TextField(template),
        Button(template),
        Columns(template),
        Container(template)
    ];
}