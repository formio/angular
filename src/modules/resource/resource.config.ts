import { Injectable } from '@angular/core';
import { FormioAppConfig } from '../../index';

@Injectable()
export class FormioResourceConfig {
    app: FormioAppConfig;
    name: string;
    form: string;
    parents: Array<string> = [];
}
