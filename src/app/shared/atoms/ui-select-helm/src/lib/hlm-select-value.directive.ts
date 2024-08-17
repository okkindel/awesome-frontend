import type { ClassValue } from 'clsx';

import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';

@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/component-selector, @angular-eslint/directive-selector
    'hlm-select-value,[hlmSelectValue], brn-select-value[hlm]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSelectValueDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      '!inline-block ltr:text-left rtl:text-right border-border w-[calc(100%)]] min-w-0 pointer-events-none truncate',
      this.userClass(),
    ),
  );
}
