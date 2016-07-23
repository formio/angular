import { Injectable, Type } from '@angular/core';
import { FormioForm } from '../formio/formio.component';
import { FORM } from '../fixtures/forms/registration';
@Injectable()
export class FormService extends Type {
    getForm() : FormioForm {
        return FORM;
    }
}