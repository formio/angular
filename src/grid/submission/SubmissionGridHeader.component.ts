import { Component } from '@angular/core';
import { Utils, Components } from 'formiojs';
import { GridHeaderComponent } from '../GridHeaderComponent';
import {FormioPromiseService} from '../../formio-promise.service';

@Component({
  templateUrl: './SubmissionGridHeader.component.html'
})
export class SubmissionGridHeaderComponent extends GridHeaderComponent {
  load(formio: FormioPromiseService, query?: any) {
    query = query || {};
    return formio.loadForm({params: query}).then((form: any) => {
      this.headers = [];
      Utils.eachComponent(form.components, (component: any) => {
        if (
          component.input &&
          (!component.hasOwnProperty('tableView') || component.tableView)
        ) {
          this.headers.push({
            label: component.label,
            key: 'data.' + component.key,
            sort: '',
            component: Components.create(component, null, null, true)
          });
        }
      }, true);
      return this.headers;
    });
  }
}
