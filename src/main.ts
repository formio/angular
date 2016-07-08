import { bootstrap }                            from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from 'formio/formio';
import { AppComponent } from './app/app.component';
bootstrap(AppComponent, [
    FORMIO_BOOTSTRAP,
    disableDeprecatedForms(),
    provideForms()
])
.catch((err: any) => console.error(err));