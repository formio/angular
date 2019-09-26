import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomTagsService {
  tags: string[] = [];

  addCustomTag(tag: string) {
    this.tags.push(tag);
  }
}
