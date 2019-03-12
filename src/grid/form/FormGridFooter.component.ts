import {Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';

@Component({
  templateUrl: './FormGridFooter.component.html',
  styleUrls: ['../grid.footer.scss'],
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
