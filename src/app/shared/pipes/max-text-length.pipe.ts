import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxTextLength',
  standalone: true
})
export class MaxTextLengthPipe implements PipeTransform {

  transform(value: string, limit: number): any {
    if (!value || limit <= 0) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    const trimmedText = value.substring(0, limit);
    const lastSpaceIndex = trimmedText.lastIndexOf(' ');

    return lastSpaceIndex === -1 ? trimmedText : trimmedText.substring(0, lastSpaceIndex) + '...';
  }

}
