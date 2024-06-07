import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    let result = '';
    const seconds = Math.floor(value % 60);
    value = Math.floor(value / 60);
    if (value > 0) {
      const minutes = Math.floor(value % 60);
      value = Math.floor(value / 60);
      if (value > 0) {
        const hours = Math.floor(value % 24);
        value = Math.floor(value / 24);
        if (value > 0) {
          const days = Math.floor(value);
          result += `${days}d `;
        }
        if (hours > 0) {
          result += `${hours}h `;
        }
      }
      if (minutes > 0) {
        result += `${minutes}m `;
      }
    }
    if (seconds > 0) {
      result += `${seconds}s `;
    }
    return result;
  }
}
