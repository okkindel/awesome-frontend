import type { ClassValue } from 'clsx';

import {
  Directive,
  computed,
  inject,
  signal,
  Input,
  input,
} from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { BrnLabelDirective } from '@spartan-ng/ui-label-brain';
import { hlm } from '@spartan-ng/ui-core';

export const labelVariants = cva(
  'text-sm font-medium leading-none [&:has([hlmInput]:disabled)]:cursor-not-allowed [&:has([hlmInput]:disabled)]:opacity-70 [&>[hlmInput]]:my-1',
  {
    variants: {
      variant: {
        default: '',
      },
      error: {
        auto: '[&:has([hlmInput].ng-invalid.ng-touched)]:text-destructive',
        true: 'text-destructive',
      },
      disabled: {
        auto: '[&:has([hlmInput]:disabled)]:opacity-70',
        true: 'opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: 'auto',
    },
  },
);
export type LabelVariants = VariantProps<typeof labelVariants>;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmLabel]',
  standalone: true,
  hostDirectives: [
    {
      directive: BrnLabelDirective,
      inputs: ['id'],
    },
  ],
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmLabelDirective {
  private readonly _brn = inject(BrnLabelDirective, { host: true });

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      labelVariants({
        variant: this._variant(),
        error: this._error(),
        disabled: this._brn?.dataDisabled() ?? 'auto',
      }),
      '[&.ng-invalid.ng-touched]:text-destructive',
      this.userClass(),
    ),
  );

  private readonly _variant = signal<LabelVariants['variant']>('default');
  @Input()
  public set variant(value: LabelVariants['variant']) {
    this._variant.set(value);
  }

  private readonly _error = signal<LabelVariants['error']>('auto');
  @Input()
  public set error(value: LabelVariants['error']) {
    this._error.set(value);
  }
}
