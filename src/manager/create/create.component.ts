import { Component, OnInit } from '@angular/core';
import { FormManagerEditComponent } from '../edit/edit.component';

@Component({
  templateUrl: '../edit/edit.component.html'
})
export class FormManagerCreateComponent extends FormManagerEditComponent implements OnInit {
  ngOnInit() {
    this.service.reset();
  }
}
