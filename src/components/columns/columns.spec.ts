import { FormGroup, FormControl } from '@angular/forms';
import { ColumnsComponent, ColumnsOptions } from './columns';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.templates';
import { RegisterComponents } from '../index';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponentComponent } from '../../formio-component.component';
import { FormioEvents } from '../../formio.events';
import { INPUT } from '../../fixtures/fields/input';

describe('ColumnsComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
        this.events = new FormioEvents();
    });

    var getSettings = (overrides: {}): ColumnsOptions => {
        let settings: ColumnsOptions = {
            "input": false,
            "columns": [{
                "components": [INPUT('textfield', 'text', 'firstName', 'First Name')]
            }, {
                "components": [INPUT('textfield', 'text', 'lastName', 'Last Name')]
            }],
            "type": "columns",
            "conditional": {
                "show": "",
                "when": null,
                "eq": ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    it('Should create the columns control.', () => {
        let settings: ColumnsOptions = getSettings({});
        let container = new ColumnsComponent(this.form, settings, this.events);
        var index = 0;

        // Iterate through each column and create the component.
        settings.columns.forEach((column: any) => {
            let components = new FormioComponentsComponent();
            components.components = column.components;
            components.form = this.form;
            column.components.forEach((comp: any) => {
                index++;
                let component = new FormioComponentComponent(this.events);
                component.component = comp;
                component.form = this.form;
                component.ngOnInit();
                component.form.controls[comp.key]['setValue']('Test' + index);
                component.form.controls[comp.key]['markAsDirty']();
            });
        });
        expect(this.form.value).toEqual({firstName: 'Test1', lastName: 'Test2'});
    });
});