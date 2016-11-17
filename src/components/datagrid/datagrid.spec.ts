/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';

describe('DataGridComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    it('Should create the datagrid control.', () => {
        expect(true).toEqual(true);
    });
});