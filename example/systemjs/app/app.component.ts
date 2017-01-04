import {Component} from '@angular/core';
import { FORM } from '../kitchensink';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.html'
})

export class AppComponent {
  public form: any = FORM;
}
