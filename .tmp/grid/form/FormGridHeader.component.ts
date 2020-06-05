import {Component} from '@angular/core';
import {GridHeaderComponent} from '../GridHeaderComponent';
import {GridHeader, SortType} from '../types/grid-header';

@Component({
  selector: 'form-grid-header',
  template: "<ng-template> <thead> <tr> <th> <div class=\"row\"> <div class=\"col-sm-8\"> <a (click)=\"sort.emit(header)\"> {{ header.label }}&nbsp;<span [ngClass]=\"{'glyphicon-triangle-top fa-caret-up': (header.sort === 'asc'), 'glyphicon-triangle-bottom fa-caret-down': (header.sort === 'desc')}\" class=\"glyphicon fa\" *ngIf=\"header.sort\"></span> </a> </div> <div class=\"col-sm-4\"> Operations </div> </div> </th> </tr> </thead> </ng-template> "
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
