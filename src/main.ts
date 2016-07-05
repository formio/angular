import { bootstrap }                            from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { TextField } from './app/formio/components/textfield/textfield.component';
import { AppComponent } from './app/app.component';
bootstrap(AppComponent, [
    TextField,
    disableDeprecatedForms(),
    provideForms()
])
.catch((err: any) => console.error(err));