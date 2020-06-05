import { Component } from '@angular/core';
import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '../../formio-promise.service';

@Component({
  selector: 'form-grid-body',
  styles: [".form-btn { font-size: 0.75rem; } "],
  template: "<ng-template> <tbody *ngIf=\"rows\"> <tr *ngFor=\"let form of rows\"> <td> <div class=\"row\"> <div class=\"col-sm-8\"> <a routerLink=\"{{form._id}}/view\" (click)=\"onRowSelect($event, form)\"><h5>{{ form.title }}</h5></a> </div> <div class=\"col-sm-4\"> <button *ngIf=\"actionAllowed('formView')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'view')\"><span class=\"fa fa-pencil\"></span> Enter Data</button>&nbsp; <button *ngIf=\"actionAllowed('submissionIndex')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'submission')\"><span class=\"fa fa-list-alt\"></span> View Data</button>&nbsp; <button *ngIf=\"actionAllowed('formEdit')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'edit')\"><span class=\"fa fa-edit\"></span> Edit Form</button>&nbsp; <button *ngIf=\"actionAllowed('formDelete')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'delete')\"><span class=\"fa fa-trash\"></span></button> </div> </div> </td> </tr> </tbody> </ng-template> "
})
export class FormGridBodyComponent extends GridBodyComponent {
  load(formio: FormioPromiseService, query?: any) {
    query = query || {};
    return formio.loadForms({ params: query }).then((forms: any) => this.setRows(query, forms));
  }
}
