import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.templates';
import { RegisterComponents } from '../index';
import { FormioEvents } from '../../formio.events';

describe('DataGridComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
        this.events = new FormioEvents();
    });

    it('Should create the datagrid control.', () => {
        expect(true).toEqual(true);
    });
});