import { Component } from '@angular/core';
import { each, get } from 'lodash';
import { GridBodyComponent } from '../GridBodyComponent';
import {FormioPromiseService} from '../../formio-promise.service';
import { GridHeader } from '../types/grid-header';
import FormioSubmission from '../../types/formio-submission';
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
   * @param submission
   * @param header
   * @return any
   */
  view(submission: FormioSubmission, header: GridHeader): string {
    const cellValue: any = get(submission, header.key);
    if (header.renderCell) {
      return header.renderCell(cellValue, header.component);
    } else {
      if (header.component) {
        if (header.component.getView) {
          return header.component.getView(cellValue);
        }
        return header.component.asString(cellValue);
      } else {
        return cellValue.toString();
      }
    }
  }
}
