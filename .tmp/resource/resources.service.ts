import { Injectable, EventEmitter } from '@angular/core';
import { FormioAuthService } from '../auth/auth.service';

export interface FormioResourceMap {
  [name: string]: any;
}

@Injectable()
export class FormioResources {
  resources: FormioResourceMap = {};
  error: EventEmitter<any>;
  onError: EventEmitter<any>;
  constructor(
    public auth?: FormioAuthService
  ) {
    this.error = new EventEmitter();
    this.onError = this.error;
    this.resources = {
      currentUser: {
        resourceLoaded: this.auth.userReady
      }
    };
  }
}
