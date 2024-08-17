import type { ClassValue } from 'clsx';

import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  type OnDestroy,
  PLATFORM_ID,
  ElementRef,
  Component,
  computed,
  inject,
  signal,
  Input,
} from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { isPlatformBrowser } from '@angular/common';
import { cva } from 'class-variance-authority';
import { hlm } from '@spartan-ng/ui-core';

const DEFINED_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', 'none'] as const;

type DefinedSizes = (typeof DEFINED_SIZES)[number];

export const iconVariants = cva('inline-flex', {
  variants: {
    variant: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      base: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
      none: '',
    } satisfies Record<DefinedSizes, string>,
  },
  defaultVariants: {
    variant: 'base',
  },
});

export type IconSize = (Record<never, never> & string) | DefinedSizes;

export type IconName = keyof typeof icons;

const isDefinedSize = (size: IconSize): size is DefinedSizes => {
  return DEFINED_SIZES.includes(size as DefinedSizes);
};

const TAILWIND_H_W_PATTERN = /\b(h-\d+|w-\d+)\b/g;

@Component({
  selector: 'front-icon',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lucide-angular
      [class]="ngIconCls()"
      [size]="ngIconSize()"
      [name]="_name()"
      [color]="_color()"
      [strokeWidth]="_strokeWidth()"
    />
  `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmIconComponent implements OnDestroy {
  private readonly _host = inject(ElementRef);
  private readonly _platformId = inject(PLATFORM_ID);

  private _mutObs?: MutationObserver;

  private readonly _hostClasses = signal<string>('');

  protected readonly _name = signal<IconName | string>('');
  protected readonly _size = signal<IconSize>('base');
  protected readonly _color = signal<undefined | string>(undefined);
  protected readonly _strokeWidth = signal<undefined | string | number>(
    undefined,
  );
  protected readonly userCls = signal<ClassValue>('');
  protected readonly ngIconSize = computed(() =>
    isDefinedSize(this._size()) ? '100%' : (this._size() as string),
  );
  protected readonly ngIconCls = signal<string>('');

  protected readonly _computedClass = computed(() => {
    const size: IconSize = this._size();
    const hostClasses = this._hostClasses();
    const userCls = this.userCls();
    const variant = isDefinedSize(size) ? size : 'none';
    const classes =
      variant === 'none' && size === 'none'
        ? hostClasses
        : hostClasses.replace(TAILWIND_H_W_PATTERN, '');
    return hlm(iconVariants({ variant }), userCls, classes);
  });

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this._mutObs = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          if (mutation.attributeName !== 'class') return;
          this._hostClasses.set(
            (mutation.target as { className?: string } & Node)?.className ?? '',
          );
        });
      });
      this._mutObs.observe(this._host.nativeElement, {
        attributes: true,
      });
    }
  }

  public ngOnDestroy(): void {
    this._mutObs?.disconnect();
    this._mutObs = undefined;
  }

  @Input()
  public set name(value: IconName | string) {
    this._name.set(value);
  }

  @Input()
  public set size(value: IconSize) {
    this._size.set(value);
  }

  @Input()
  public set color(value: undefined | string) {
    this._color.set(value);
  }

  @Input()
  public set strokeWidth(value: undefined | string | number) {
    this._strokeWidth.set(value);
  }

  @Input()
  public set ngIconClass(cls: ClassValue) {
    this.ngIconCls.set(hlm(cls));
  }

  @Input()
  public set class(cls: ClassValue) {
    this.userCls.set(cls);
  }
}
