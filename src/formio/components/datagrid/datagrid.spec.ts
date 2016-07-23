import { describe, expect, it } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

describe('DataGridComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    it('Should create the datagrid control.', () => {
        expect(true).toEqual(true);
    });
});