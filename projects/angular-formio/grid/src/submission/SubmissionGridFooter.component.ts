import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';

@Component({
  templateUrl: './SubmissionGridFooter.component.html',
  styleUrls: ['../grid.footer.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
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
