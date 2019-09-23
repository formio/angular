import { Component } from '@angular/core';
import { Formio, Utils, Components } from 'formiojs';
import { GridHeaderComponent } from '../GridHeaderComponent';

@Component({
  templateUrl: './SubmissionGridHeader.component.html'
})
export class SubmissionGridHeaderComponent extends GridHeaderComponent {
  load(formio: Formio, query?: any) {
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
