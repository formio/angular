import { Component } from '@angular/core';
import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '../../formio-promise.service';

@Component({
  selector: 'form-grid-body',
  styleUrls: ['./FormGridBody.component.scss'],
  templateUrl: './FormGridBody.component.html'
})
export class FormGridBodyComponent extends GridBodyComponent {
  load(formio: FormioPromiseService, query?: any) {
    query = query || {};
    return formio.loadForms({ params: query }).then((forms: any) => this.setRows(query, forms));
  }
}
