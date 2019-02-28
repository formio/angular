import { Component } from '@angular/core';
import { each } from 'lodash';
import { Formio } from 'formiojs';
import { GridBodyComponent } from '../GridBodyComponent';

@Component({
  selector: 'user-grid-body',
  styleUrls: ['./UserGridBody.component.scss'],
  templateUrl: './UserGridBody.component.html'
})
export class UserGridBodyComponent extends GridBodyComponent {
  load(formio: Formio, query?: any) {
    query = query || {};
    return formio.loadForms({ params: query }).then((forms: any) => this.setRows(query, forms));
  }
}
