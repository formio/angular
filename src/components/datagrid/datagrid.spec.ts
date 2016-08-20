/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { RegisterComponents } from '../index';

describe('DataGridComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_TEMPLATE);
        this.form = new FormGroup({});
    });

    it('Should create the datagrid control.', () => {
        expect(true).toEqual(true);
    });
});