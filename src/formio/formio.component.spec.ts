import { describe, expect, it, inject, async, TestComponentBuilder, ComponentFixture, addProviders } from '@angular/core/testing';
import { Formio } from './formio.component';
import { FORMIO_BOOTSTRAP } from './bootstrap';
import { FORM } from '../fixtures/forms/registration';

describe('FormioComponent', () => {
    beforeEach(() => {
        addProviders([FORMIO_BOOTSTRAP]);
    })
    it('Should create the form and view children', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(Formio).then((fixture: ComponentFixture<Formio>) => {
            let formio = fixture.componentInstance;
            formio.form = FORM;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('formio-component').length).toEqual(2);
        });
    })));
    it('Should be able to create a form from the structure.', () => {
        let formio = new Formio();
        formio.form = FORM;
        
    });


});