import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince'
})
export class TimeSince implements PipeTransform {
  transform(date: Date): string {
    const elapsed = (new Date().getTime() - new Date(date).getTime()) / 1000;
    let interval;
    if (interval >= 1) {
      return interval + ' year' + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(elapsed / 2592000);
    if (interval >= 1){
      return interval + ' month' + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(elapsed / 86400);
    if (interval >= 1) {
      return interval + ' day' + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(elapsed / 3600);
    if (interval >= 1) {
      return interval + ' hour' + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(elapsed / 60);
    if (interval >= 1) {
      return interval + ' minute' + (interval > 1 ? 's' : '');
    }
    return Math.floor(elapsed) + ' second' + (elapsed > 1 ? 's' : '');
  }
}