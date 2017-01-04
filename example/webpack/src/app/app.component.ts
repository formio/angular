import { Component } from '@angular/core';
import '../../public/css/styles.css';
import { FORM } from '../kitchensink';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public form: any = FORM;
}
