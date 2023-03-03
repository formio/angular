import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '@formio/angular';
import { Tooltip } from 'bootstrap';
@Component({
  selector: 'form-grid-body',
  styleUrls: ['./FormGridBody.component.scss'],
  templateUrl: './FormGridBody.component.html'
})
export class FormGridBodyComponent extends GridBodyComponent implements OnDestroy {
  @ViewChild('create') createBtn: ElementRef;
  @ViewChild('view') viewBtn: ElementRef;
  @ViewChild('edit') editBtn: ElementRef;
  @ViewChild('permissions') permissionsBtn: ElementRef;
  @ViewChild('delete') deleteBtn: ElementRef;
  public tooltips: Array<Tooltip> = [];
  load(formio: FormioPromiseService, query?: any) {
    query = query || {};
    return formio.loadForms({ params: query })
      .then((forms: any) => this.setRows(query, forms))
      .then(() => {
        this.tooltips.push(new Tooltip(this.createBtn.nativeElement, {
          title: 'Enter Data'
        }));
        this.tooltips.push(new Tooltip(this.viewBtn.nativeElement, {
          title: 'View Data'
        }));
        this.tooltips.push(new Tooltip(this.editBtn.nativeElement, {
          title: 'Edit Form'
        }));
        this.tooltips.push(new Tooltip(this.permissionsBtn.nativeElement, {
          title: 'Permissions'
        }));
        this.tooltips.push(new Tooltip(this.deleteBtn.nativeElement, {
          title: 'Delete form'
        }));
      });
  }

  ngOnDestroy(): void {
    this.tooltips.forEach((tootip: Tooltip) => tootip.dispose());
  }
}
