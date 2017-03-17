import { Injectable } from '@angular/core';

export interface FormioResourceMap {
    [name: string]: any;
}

@Injectable()
export class FormioResourceRegistry {
    resources: FormioResourceMap = {};
}
