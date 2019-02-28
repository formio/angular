import {Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';

@Component({
  templateUrl: './UserGridFooter.component.html',
  styleUrls: ['../grid.footer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserGridFooterComponent extends GridFooterComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.createText) {
      this.createText = 'Invite User';
    }
  }
}
