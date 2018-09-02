import { Component } from '@angular/core';
import { each } from 'lodash';
import { Formio } from 'formiojs';
import { GridBodyComponent } from '../GridBodyComponent';

@Component({
  selector: 'form-grid-body',
  styleUrls: ['./FormGridBody.component.scss'],
  templateUrl: './FormGridBody.component.html'
})
export class FormGridBodyComponent extends GridBodyComponent {
  load(formio: Formio, query?: any) {
    query = query || {};
    return formio.loadForms({ params: query }).then((forms: any) => this.setRows(query, forms));
  }
}
