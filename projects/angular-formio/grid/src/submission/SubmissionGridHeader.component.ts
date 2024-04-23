import {Component} from '@angular/core';
import {Utils, Components} from '@formio/js';
import {ExtendedComponentSchema} from '@formio/deprecated-types';
import {GridHeaderComponent} from '../GridHeaderComponent';
import {FormioPromiseService} from '@formio/angular';
import {ComponentInstance, FormioForm} from '@formio/angular';
import {GridColumn} from '../types/grid-column';
import {GridHeader, SortType} from '../types/grid-header';

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
          this.setHeader(this.getHeaderForColumn(column, this.formComponents.get(column.path)));
        }) : this.setComponentsHeaders(this.formComponents);

      return this.headers;
    });
  }

  setHeader(header: GridHeader) {
    this.headers.push(header);
  }

  getHeaderForColumn(column: GridColumn, component?: ExtendedComponentSchema, sort?: SortType) {
    return {
      label: column.label,
      key: column.path,
      sort: sort,
      component: component ? Components.create(component, null, null) as ComponentInstance : undefined,
      renderCell: column ? column.renderCell : undefined
    };
  }

  getHeaderForComponent(component: ExtendedComponentSchema, path: string, sort?: SortType) {
    return {
      label: component.label,
      key: path,
      sort: sort,
      component: component ? Components.create(component, null, null) as ComponentInstance : undefined,
    };
  }
  // Set headers from components in case if columns are not provided
  setComponentsHeaders(components: Map<string, ExtendedComponentSchema>, sort?: SortType) {
    components.forEach((component, path) => {
      if (
        component.input &&
        (!component.hasOwnProperty('tableView') || component.tableView)
      ) {
        this.setHeader(this.getHeaderForComponent(component, path, sort));
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

