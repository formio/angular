import { Injectable } from '@angular/core';

@Injectable()
export class FormioResourceConfig {
  name = '';
  form = '';
  parents: string[] = [];
}
