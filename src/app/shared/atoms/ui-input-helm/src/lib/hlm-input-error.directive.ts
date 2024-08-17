import type { ClassValue } from 'clsx';

import { type VariantProps, cva } from 'class-variance-authority';
import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';

export const inputErrorVariants = cva('text-sm font-medium text-destructive', {
  variants: {},
  defaultVariants: {},
});
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>;

@Directive({
  selector: '[frontInputError]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmInputErrorDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(inputErrorVariants(), this.userClass()),
  );
}
