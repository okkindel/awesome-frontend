import { HlmIconComponent } from '@shared/atoms/ui-icon-helm/src';
import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hlm-select-scroll-up',
  standalone: true,
  imports: [HlmIconComponent],
  host: {
    class: 'flex cursor-default items-center justify-center py-1',
  },
  template: `
    <hlm-icon class="ml-2 size-4" name="ChevronUp" />
  `,
})
export class HlmSelectScrollUpComponent {}
