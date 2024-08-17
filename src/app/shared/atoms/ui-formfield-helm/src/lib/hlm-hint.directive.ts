import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmHint]',
  standalone: true,
  host: {
    class: 'block text-sm text-muted-foreground',
  },
})
export class HlmHintDirective {}
