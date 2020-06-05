import {Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';

@Component({
  template: "<ng-template> <tfoot class=\"formio-grid-footer\"> <tr> <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\"> <button *ngIf=\"actionAllowed('formCreate')\" class=\"btn btn-primary pull-left float-left\" (click)=\"createItem.emit('form')\"><i class=\"glyphicon glyphicon-plus fa fa-plus\"></i> {{ createText }}</button> <span class=\"pull-right float-right item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span> <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\"> </pagination> </td> </tr> </tfoot> </ng-template> ",
  styles: ["tfoot.formio-grid-footer td { padding: 0.3rem; } tfoot.formio-grid-footer .page-num { font-size: 1.4em; } tfoot.formio-grid-footer ul.pagination { margin-top: 5px; margin-bottom: 0; } "],
  encapsulation: ViewEncapsulation.None
})
export class FormGridFooterComponent extends GridFooterComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.createText) {
      this.createText = 'Create Form';
    }
    if (!this.size) {
      this.size = 7;
    }
  }
}
