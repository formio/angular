import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormioLoader {
  public loading$ = new BehaviorSubject(true);
  public loading = true;

  setLoading(loading: boolean) {
    this.loading = loading;
    this.loading$.next(loading);
  }
}

