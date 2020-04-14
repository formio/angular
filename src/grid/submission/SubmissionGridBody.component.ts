import { Component } from '@angular/core';
import { each, get } from 'lodash';
import { GridBodyComponent } from '../GridBodyComponent';
import {FormioPromiseService} from '../../formio-promise.service';
import { Utils } from 'formiojs';
import momentDate = Utils.momentDate;
import formatDate = Utils.formatDate;
import {FormRow, GridHeader} from '../../formio.common';

@Component({
  templateUrl: './SubmissionGridBody.component.html'
})
export class SubmissionGridBodyComponent extends GridBodyComponent {
  load(formio: FormioPromiseService, query?: any) {
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
  view(row: FormRow, header: GridHeader) {
    const cellValue: any = get(row, header.key);
    if (header.renderCell) {
      return header.renderCell(cellValue, header.component);
    } else {
      if (header.component) {
        if (typeof header.component.getView === 'function') {
          return header.component.getView(cellValue);
        }
        return header.component.asString(cellValue);
      } else {
        return cellValue.toString();
      }
    }
  }
}
