import { Component } from '@angular/core';
import { GridHeaderComponent } from '../GridHeaderComponent';

@Component({
  selector: 'form-grid-header',
  templateUrl: './FormGridHeader.component.html'
})
export class FormGridHeaderComponent extends GridHeaderComponent {
  public header: any;
  load(formio?: any) {
    this.header = {
      label: 'Title',
      key: 'title',
      sort: 'asc'
    };
    this.headers = [this.header];
    return Promise.resolve(this.headers);
  }

  get numHeaders() {
    return 2;
  }
}
