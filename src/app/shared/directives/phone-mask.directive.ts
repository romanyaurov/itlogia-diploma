import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    const input = this.el.nativeElement;

    if (!input.value) {
      input.value = '+7 (';
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = this.el.nativeElement;
    if (input.value === '+7 (') {
      input.value = '';
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;

    switch (input.value.length) {
      case 7:
        input.value += ') ';
        break;
      case 12:
        input.value += '-';
        break;
      case 15:
        input.value += '-';
        break;
    }

    if (input.value.length > 18) {
      input.value = input.value.slice(0, 18);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement;

    if (input.value.length >= 18 && event.key !== 'Backspace') {
      event.preventDefault();
      return;
    }

    if (event.key === 'Backspace') {
      switch (input.value.length) {
        case 16:
          input.value = input.value.slice(0, 15);
          break;
        case 13:
          input.value = input.value.slice(0, 12);
          break;
        case 9:
          input.value = input.value.slice(0, 7);
          break;
        case 4:
          event.preventDefault();
          break;
      }
      return;
    }

    if (!event.key.match(/\d/)) {
      event.preventDefault();
    }
  }
}
