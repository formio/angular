import {Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'formio-loader',
  styleUrls: ['./formio.loader.component.scss'],
  templateUrl: './formio.loader.component.html',
    imports: [NgIf]
})
export class FormioLoaderComponent {
  @Input() isLoading: boolean
}
