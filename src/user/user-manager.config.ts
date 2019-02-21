import { Injectable } from '@angular/core';

export interface UserManagerRouteConfig {
  userIndex?: any;
  user?: any;
  userView?: any;
  submissionIndex?: any;
  submission?: any;
  submissionView?: any;
  submissionEdit?: any;
  submissionDelete?: any;
}

@Injectable()
export class UserManagerConfig {
  public includeSearch = false;
  public saveDraft = false;
  public renderer: any;
}
