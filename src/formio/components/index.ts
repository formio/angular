import { TextField } from './textfield/textfield';
import { Button } from './button/button';
import { Columns } from './columns/columns';
import { Container } from './container/container';
import { EmailField } from './email/email';
import { Inputs } from './input/input';
import { PasswordField } from './password/password';
import { CheckBox } from './checkbox/checkbox';
import { DataGrid } from './datagrid/datagrid';
import { FormioTemplate } from '../formio.template';
export function FORMIO_COMPONENTS(template: FormioTemplate) {
    return [
        TextField(template),
        Button(template),
        Columns(template),
        Container(template),
        DataGrid(template),
        EmailField(template),
        Inputs(template),
        PasswordField(template),
        CheckBox(template)
    ];
}
