import { Injectable } from '@angular/core';
import _intersection from 'lodash/intersection';

@Injectable()
export class GridService {
  public rows: Array<any>;
  constructor() {}

  setRows(rows) {
    this.rows = rows;
  }

  getFormsPerPage() {
    return this.rows?.length;
  }
}
