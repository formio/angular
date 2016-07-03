import { Component, Type } from '@angular/core';
import { Formio } from './formio/formio.component';
import { FormService } from './form.service';
@Component({
    selector: 'app',
    template: `
    <div>
      <formio [components]="components"></formio>
    </div>
  `,
    directives: [Formio],
    providers:  [FormService]
})
export class AppComponent extends Type {
    components: any[];
    constructor(service: FormService) {
        super();
        this.components = service.getForm();
    }
}