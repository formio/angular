import { Component, Type } from '@angular/core';
import { FORM } from '../src/fixtures/forms/kitchensink.ts';
import { FORM_WIZARD } from '../src/fixtures/forms/kitchensink.ts';
@Component({
    selector: 'app',
    template: require('./app.html')
})
export class AppComponent extends Type {
    public form: any = FORM;
    public form_wizard: any = FORM_WIZARD;
    public submission: any = {
      data: {
          user: {
              firstName: 'Joe',
              lastName: 'Smith',
              email: 'joe@example.com',
              kids: [
                  'Susie',
                  'Jack'
              ]
          },
          cars: [
              {
                  make: 'Jeep',
                  model: 'Wrangler',
                  year: '2010'
              },
              {
                  make: 'Ford',
                  model: 'Mustang',
                  year: '2014'
              }
          ]
      }
    };
    onRender() {
        console.log('onRender');
    }
    onSubmit(value: any) {
        console.log('onSubmit');
        console.log(value);
    }
    onChange(value: any) {
        console.log('onChange');
        console.log(value);
    }
}
