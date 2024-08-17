import type { ClassValue } from 'clsx';

import { Directive, computed, signal, Input, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { hlm } from '@spartan-ng/ui-core';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmButton]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmButtonDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  private readonly _settableClass = signal<ClassValue>('');

  protected _computedClass = computed(() =>
    hlm(
      buttonVariants({ variant: this._variant(), size: this._size() }),
      this._settableClass(),
      this.userClass(),
    ),
  );

  public setClass(value: ClassValue): void {
    this._settableClass.set(value);
  }

  private readonly _variant = signal<ButtonVariants['variant']>('default');
  @Input()
  public set variant(variant: ButtonVariants['variant']) {
    this._variant.set(variant);
  }

  private readonly _size = signal<ButtonVariants['size']>('default');
  @Input()
  public set size(size: ButtonVariants['size']) {
    this._size.set(size);
  }
}
