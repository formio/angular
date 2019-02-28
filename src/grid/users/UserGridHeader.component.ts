import { Component } from '@angular/core';
import { GridHeaderComponent } from '../GridHeaderComponent';

@Component({
  selector: 'user-grid-header',
  templateUrl: './UserGridHeader.component.html'
})
export class UserGridHeaderComponent extends GridHeaderComponent {
  public header: any;
  load(formio?: any) {
    this.header = {
      label: 'Users',
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
