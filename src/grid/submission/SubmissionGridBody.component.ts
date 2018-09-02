import { Component } from '@angular/core';
import { each, get } from 'lodash';
import { Formio } from 'formiojs';
import { GridBodyComponent } from '../GridBodyComponent';

@Component({
  templateUrl: './SubmissionGridBody.component.html'
})
export class SubmissionGridBodyComponent extends GridBodyComponent {
  load(formio: Formio, query?: any) {
    query = query || {};
    return formio.loadSubmissions({ params: query })
      .then((submissions: any) => this.setRows(query, submissions));
  }

  /**
   * Render the cell data.
   *
   * @param row
   * @param header
   * @return any
   */
  view(row: any, header: any) {
    const cellValue: any = get(row, header.key);
    if (typeof header.component.getView === 'function') {
      return header.component.getView(cellValue);
    }
    return header.component.asString(cellValue);
  }
}
