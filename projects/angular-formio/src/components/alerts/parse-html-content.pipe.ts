import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parseHtmlContent', pure: false })
export class ParseHtmlContentPipe implements PipeTransform {

  /*
    Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
    And then render in template.
  */
  transform(content) {
    const parsedContent = new DOMParser().parseFromString(content, 'text/html').body.childNodes[0];

    return parsedContent?.textContent;
  }
}
