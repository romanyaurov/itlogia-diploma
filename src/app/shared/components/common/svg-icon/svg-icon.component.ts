import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: `<svg:use [attr.xlink:href]="href"></svg:use>`,
  styles: [`
    :host {
      display: inline-block;
      svg {
        display: inline-block;
        all: inherit;
      }
    }
  `]
})
export class SvgIconComponent {

  @Input() icon!: string;

  get href(): string {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }

}
