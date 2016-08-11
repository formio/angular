import { TextField } from './textfield/textfield';
import { Button } from './button/button';
import { Columns } from './columns/columns';
import { Container } from './container/container';
import { EmailField } from './email/email';
import { CheckBox } from './checkbox/checkbox';
import { DataGrid } from './datagrid/datagrid';
import { TextAreaField } from './textarea/textarea';
import { PasswordField } from './password/password';
import { NumberField } from './number/number';
import { HiddenField } from './hidden/hidden';
import { FormioTemplate } from '../formio.template';
import { RadioField } from './radio/radio';
import { CustomField } from './custom/custom';
import { Table } from './table/table';
import { Panel } from './panel/panel';
import { FieldSet } from './fieldset/fieldset';
import { Well } from './well/well';
export function FORMIO_COMPONENTS(template: FormioTemplate) {
    return [
        TextField(template),
        Button(template),
        Columns(template),
        Container(template),
        DataGrid(template),
        EmailField(template),
        TextAreaField(template),
        HiddenField(template),
        PasswordField(template),
        NumberField(template),
        RadioField(template),
        CheckBox(template),
        CustomField(template),
        Table(template),
        Panel(template),
        FieldSet(template),
        Well(template)
    ];
}
