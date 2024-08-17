import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[frontError]',
  host: {
    class: 'block text-destructive text-sm font-medium',
  },
})
export class HlmErrorDirective {}
