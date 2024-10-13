import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNameInput]',
  standalone: true
})
export class NameInputDirective {

  private controlKeys = [
    'Backspace', 'Tab', 'Enter',
    'Shift', 'Control', 'Alt',
    'ArrowLeft', 'ArrowRight',
    'ArrowUp', 'ArrowDown', 'Meta', 'Escape'
  ]

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = this.el.nativeElement;

    if (this.controlKeys.includes(event.key)) {
      return;
    }
    
    if (!event.key.match(/[а-яА-Яa-zA-Z]/) && event.key !== ' ') {
      event.preventDefault();
    } else if (input.value[input.value.length - 1] === ' ') {
      event.preventDefault();
      if (event.key !== ' ') {
        input.value += event.key.toUpperCase();
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    
    if (input.value.length === 1) {
      input.value = input.value.toUpperCase();
    }
  }
}
