import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmHint]',
  standalone: true,
  host: {
    class: 'block text-sm text-muted-foreground',
  },
})
export class HlmHintDirective {}
