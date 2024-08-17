import type { ClassValue } from 'clsx';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  input,
} from '@angular/core';
import { BrnSelectOptionDirective } from '@spartan-ng/ui-select-brain';
import { HlmIconComponent } from '@shared/atoms/ui-icon-helm/src';
import { hlm } from '@spartan-ng/ui-core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hlm-option',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BrnSelectOptionDirective],
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    <ng-content />
    <span
      [attr.dir]="_brnSelectOption.dir()"
      class="absolute left-2 flex size-3.5 items-center justify-center rtl:left-auto rtl:right-2"
      [attr.data-state]="this._brnSelectOption.checkedState()"
    >
      @if (this._brnSelectOption.selected()) {
        <hlm-icon aria-hidden="true" name="Check" />
      }
    </span>
  `,
  imports: [HlmIconComponent],
})
export class HlmSelectOptionComponent {
  protected readonly _brnSelectOption = inject(BrnSelectOptionDirective, {
    host: true,
  });
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2  rtl:flex-reverse rtl:pr-8 rtl:pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.userClass(),
    ),
  );

  @Input()
  public set value(value: unknown | null) {
    this._brnSelectOption.value = value;
  }

  @Input()
  public disabled = false;
}
