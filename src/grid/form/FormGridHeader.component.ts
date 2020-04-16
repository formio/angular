import { Component } from '@angular/core';
import { GridHeaderComponent } from '../GridHeaderComponent';
import { GridHeader } from '../types/grid-header';

@Component({
  selector: 'form-grid-header',
  templateUrl: './FormGridHeader.component.html'
})
export class FormGridHeaderComponent extends GridHeaderComponent {
  public header: GridHeader;
  load(formio?: any) {
    this.header = {
      label: 'Title',
      path: 'title',
      sort: 'asc'
    };
    this.headers = [this.header];
    return Promise.resolve(this.headers);
  }

  get numHeaders() {
    return 2;
  }
}
