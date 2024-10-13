import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewDatetime',
  standalone: true
})
export class ReviewDatetimePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  }

}
