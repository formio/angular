import { Injectable } from '@angular/core';

@Injectable()
export class CustomTagsService {
  tags: string[] = [];

  addCustomTag(tag: string) {
    this.tags.push(tag);
  }
}
