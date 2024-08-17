import type { ClassValue } from 'clsx';

import { HlmIconComponent, IconName } from '@shared/atoms/ui-icon-helm/src';
import { BrnCheckboxComponent } from '@spartan-ng/ui-checkbox-brain';
import { Component, computed, inject, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hlm-checkbox-checkicon',
  standalone: true,
  imports: [HlmIconComponent],
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    <hlm-icon size="15" [name]="iconName()" />
  `,
})
export class HlmCheckboxCheckIconComponent {
  private _brnCheckbox = inject(BrnCheckboxComponent);
  protected _checked = this._brnCheckbox?.isChecked;
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  public readonly iconName = input<IconName>('Check');

  protected _computedClass = computed(() =>
    hlm(
      'h-4 w-4 leading-none group-data-[state=unchecked]:opacity-0',
      this._checked() === 'indeterminate' ? 'opacity-50' : '',
      this.userClass(),
    ),
  );
}
