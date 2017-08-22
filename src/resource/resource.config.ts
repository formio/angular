import { Injectable } from '@angular/core';

@Injectable()
export class FormioResourceConfig {
    name: string;
    form: string;
    parents: string[];
}
