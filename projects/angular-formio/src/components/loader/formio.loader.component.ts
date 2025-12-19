import {Component, Input} from '@angular/core';

@Component({
  selector: 'formio-loader',
  styleUrls: ['./formio.loader.component.scss'],
  templateUrl: './formio.loader.component.html',
  standalone: false
})
export class FormioLoaderComponent {
  @Input() isLoading: boolean
}
