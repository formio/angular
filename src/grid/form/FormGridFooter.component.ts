import {Component, ViewEncapsulation } from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';

@Component({
  templateUrl: './FormGridFooter.component.html',
  styleUrls: ['../grid.footer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormGridFooterComponent extends GridFooterComponent {}
