import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staticImagePath',
  standalone: true
})
export class StaticImagePathPipe implements PipeTransform {

  transform(value: string): string {
    return `url(../../../../assets/images/${value}.png)`;
  }

}
