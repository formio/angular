import { Component } from '@angular/core';
import { FormioLoader } from './formio.loader';

@Component({
  selector: 'formio-loader',
  styleUrls: ['./formio.loader.component.scss'],
  templateUrl: './formio.loader.component.html'
})
export class FormioLoaderComponent {
  constructor(public loader: FormioLoader) {}
}
