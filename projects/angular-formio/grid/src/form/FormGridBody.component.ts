import { Component, ElementRef, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '@formio/angular';
import { Tooltip } from 'bootstrap';
@Component({
  selector: 'form-grid-body',
  styleUrls: ['./FormGridBody.component.scss'],
  templateUrl: './FormGridBody.component.html'
})
export class FormGridBodyComponent extends GridBodyComponent implements OnDestroy {
  @ViewChildren('create') createBtns: ElementRef[];
  @ViewChildren('view') viewBtns: ElementRef[];
  @ViewChildren('edit') editBtns: ElementRef[];
  @ViewChildren('permissions') permissionsBtns: ElementRef[];
  @ViewChildren('delete') deleteBtns: ElementRef[];
  public tooltips: Array<Tooltip> = [];

  load(formio: FormioPromiseService, query?: any) {
    query = query || {};
    return formio.loadForms({ params: query })
      .then((forms: any) => this.setRows(query, forms))
      .then(() => this.attachTooltips());
  }

  attachTooltips() {
    this.createBtns.forEach((el: ElementRef) => {
      this.tooltips.push(new Tooltip(el.nativeElement, {title: 'Create'}));
    });
    this.editBtns.forEach((el: ElementRef) => {
      this.tooltips.push(new Tooltip(el.nativeElement, {title: 'Edit'}));
    });
    this.viewBtns.forEach((el: ElementRef) => {
      this.tooltips.push(new Tooltip(el.nativeElement, {title: 'View'}));
    })
    this.permissionsBtns.forEach((el: ElementRef) => {
      this.tooltips.push(new Tooltip(el.nativeElement, {title: 'Permissions'}));
    });
    this.deleteBtns.forEach((el: ElementRef) => {
      this.tooltips.push(new Tooltip(el.nativeElement, {title: 'Delete'}));
    });
  }

  ngOnDestroy(): void {
    this.tooltips.forEach((tootip: Tooltip) => tootip.dispose());
  }
}
