import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'serverImagePath',
  standalone: true
})
export class ServerImagePathPipe implements PipeTransform {

  transform(value: string): string {
    return `url(${environment.serverStaticPath}/${value})`;
  }

}
