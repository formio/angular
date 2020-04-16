import {Component, EventEmitter} from '@angular/core';
import {Utils, Components, ExtendedComponentSchema} from 'formiojs';
import {GridHeaderComponent} from '../GridHeaderComponent';
import {FormioPromiseService} from '../../formio-promise.service';
import {ComponentInstance, FormioForm} from '../../formio.common';
import {GridColumn} from '../types/grid-column';

@Component({
  templateUrl: './SubmissionGridHeader.component.html'
})
export class SubmissionGridHeaderComponent extends GridHeaderComponent {

  // Map structure where the key is the path and the value is the component
  formComponents: Map<string, ExtendedComponentSchema>;

  load(formio: FormioPromiseService, query?: any, columns?: Array<GridColumn>) {
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
  setHeader(column?: GridColumn, component?: ExtendedComponentSchema, sort?: any) {
    const path = column ? column.path : `data.${component.key}`;
    const label = column ? column.label : component.label;

    this.headers.push({
      label: label,
      path: path,
      sort: sort || '',
      component: component ? Components.create(component, null, null, true) as ComponentInstance : undefined,
      renderCell: column ? column.renderCell : undefined
    });
  }

  // Set headers from components in case if columns are not provided
  setComponentsHeaders(components: Map<string, ExtendedComponentSchema>, sort?: any) {
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

