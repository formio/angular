import { bootstrap }                            from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../src/bootstrap';
import { AppComponent } from './app.component';
bootstrap(AppComponent, [
    FORMIO_BOOTSTRAP,
    disableDeprecatedForms(),
    provideForms()
])
.catch((err: any) => console.error(err));