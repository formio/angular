import {Component} from '@angular/core';
import {GridHeaderComponent} from '../GridHeaderComponent';
import {GridHeader, SortType} from '../types/grid-header';

@Component({
  selector: 'form-grid-header',
  templateUrl: './FormGridHeader.component.html'
})
export class FormGridHeaderComponent extends GridHeaderComponent {
  public header: GridHeader;
  load(formio?: any) {
    this.header = {
      label: 'Title',
      key: 'title',
      sort: SortType.ASC
    };
    this.headers = [this.header];
    return Promise.resolve(this.headers);
  }

  get numHeaders() {
    return 2;
  }
}
