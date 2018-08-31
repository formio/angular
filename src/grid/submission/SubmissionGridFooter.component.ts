import { Component, ViewEncapsulation } from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';

@Component({
  templateUrl: './SubmissionGridFooter.component.html',
  styleUrls: ['../grid.footer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionGridFooterComponent extends GridFooterComponent {}
