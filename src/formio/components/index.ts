import { TextField } from './textfield/textfield';
import { Button } from './button/button';
import { Columns } from './columns/columns';
import { Container } from './container/container';
import { EmailField } from './email/email';
import { InputField } from './input/input';
import { PasswordField } from './password/password';
import { NumberField } from './number/number';
import { CheckBox } from './checkbox/checkbox';
import { DataGrid } from './datagrid/datagrid';
import { HiddenField } from './hidden/hidden';
import { FormioTemplate } from '../formio.template';
import { RadioField } from './radio/radio';
export function FORMIO_COMPONENTS(template: FormioTemplate) {
    return [
        TextField(template),
        Button(template),
        Columns(template),
        Container(template),
        DataGrid(template),
        EmailField(template),
        RadioField(template),
        HiddenField(template),
        InputField(template),
        PasswordField(template),
        NumberField(template),
        CheckBox(template)
    ];
}
