import { Component, OnInit } from '@angular/core';
import { FormManagerEditComponent } from '../edit/edit.component';
import { FormsModule } from '@angular/forms';
import { FormioAlertsComponent } from '@formio/angular';
import { FormBuilderComponent } from '@formio/angular';

@Component({
  templateUrl: '../edit/edit.component.html',
  imports: [FormsModule, FormioAlertsComponent, FormBuilderComponent]
})
export class FormManagerCreateComponent extends FormManagerEditComponent implements OnInit {
  ngOnInit() {
    this.service.reset();
  }
}
