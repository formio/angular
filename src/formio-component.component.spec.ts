/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FormioComponentComponent } from './formio-component.component';
import { FORMIO_BOOTSTRAP } from './templates/bootstrap.tpl';
import { RegisterComponents } from './components/index';
import { INPUT } from './fixtures/fields/input';
describe('FormioComponentComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    it('Should create a component with default options.', () => {
        let component = new FormioComponentComponent<string>();
        component.component = INPUT('textfield', 'text', 'firstName', 'First Name');
        component.form = this.form;
        component.ngOnInit();
        expect(component.show).toEqual(true);
        expect(component.components.length).toEqual(1);
    });

    it('Should now show by default if there are conditions.', () => {
        let component = new FormioComponentComponent<string>();
        component.component = INPUT('textfield', 'text', 'firstName', 'First Name');
        component.component.conditional = {
            show: 'true',
            when: 'lastName',
            eq: 'testing'
        };
        component.form = this.form;
        component.ngOnInit();
        expect(component.show).toEqual(false);
    });
});