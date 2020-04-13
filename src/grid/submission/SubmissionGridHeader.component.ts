import {Component, EventEmitter} from '@angular/core';
import {Utils, Components, ExtendedComponentSchema} from 'formiojs';
import {GridHeaderComponent} from '../GridHeaderComponent';
import {FormioPromiseService} from '../../formio-promise.service';
import {FormioForm} from '../../formio.common';

@Component({
  templateUrl: './SubmissionGridHeader.component.html'
})
export class SubmissionGridHeaderComponent extends GridHeaderComponent {

  // Map structure where the key is the path and the value is the component
  formComponents: Map<string, ExtendedComponentSchema>;

  load(formio: FormioPromiseService, query?: any, columns?: Array<any>) {
    query = query || {};
    return formio.loadForm({params: query}).then((form: FormioForm) => {
      this.headers = [];
      this.formComponents = new Map<string, ExtendedComponentSchema>();
      this.setComponents(form.components);
      columns ? columns.forEach(column => {
        if (this.formComponents.has(column.path)) {
          this.setHeader(column, this.formComponents.get(column.path));
        } else {
          this.setHeader(column);
        }
      }) : this.setComponentsHeaders(this.formComponents);

      return this.headers;
    });
  }

  // Set header for both component and column
  setHeader(column?: any, component?: ExtendedComponentSchema, sort?: EventEmitter<any>) {
    const key = column ? column.path : `data.${component.key}`;
    const label = column ? column.label : component.label;

    this.headers.push({
      label: label,
      key: key,
      sort: sort || '',
      component: component ? Components.create(component, null, null, true) : null,
      format: column && column.format ? column.format : null
    });
  }

  // Set headers from components in case if columns are not provided
  setComponentsHeaders(components: Map<string, ExtendedComponentSchema>, sort?: EventEmitter<any>) {
    components.forEach((component) => {
      if (
        component.input &&
        (!component.hasOwnProperty('tableView') || component.tableView)
      ) {
        this.setHeader(null, component, sort);
      }
    });
  }

  // Map components
  setComponents(components) {
    Utils.eachComponent(components, (component: ExtendedComponentSchema, newPath: string) => {
      this.formComponents.set(`data.${newPath}`, component);
    });
  }
}

