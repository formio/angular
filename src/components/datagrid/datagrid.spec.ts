/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';

describe('DataGridComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    it('Should create the datagrid control.', () => {
        expect(true).toEqual(true);
    });
});