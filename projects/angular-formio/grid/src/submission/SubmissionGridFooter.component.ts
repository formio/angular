import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './SubmissionGridFooter.component.html',
    styleUrls: ['../grid.footer.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, NgTemplateOutlet, PaginationComponent, FormsModule]
})
export class SubmissionGridFooterComponent extends GridFooterComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.size) {
      this.size = 7;
    }
  }
}
