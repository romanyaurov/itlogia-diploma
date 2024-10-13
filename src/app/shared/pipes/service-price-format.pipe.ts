import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicePriceFormat',
  standalone: true
})
export class ServicePriceFormatPipe implements PipeTransform {

  transform(value: number): string {
    const formattedNumber: string = new Intl.NumberFormat(
      'ru-RU',
      {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }
    ).format(value);
    return `От ${formattedNumber}`;
  }

}
