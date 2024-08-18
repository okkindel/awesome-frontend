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

export const iconVariants = cva('inline-flex', {
  variants: {},
  defaultVariants: {
    variant: 'base',
  },
});

export type IconName = keyof typeof icons;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hlm-icon',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lucide-angular
      [class]="ngIconCls()"
      [size]="_size()"
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
  protected readonly _size = signal<number>(18);
  protected readonly _color = signal<undefined | string>(undefined);
  protected readonly _strokeWidth = signal<undefined | string | number>(
    undefined,
  );
  protected readonly userCls = signal<ClassValue>('');
  protected readonly ngIconCls = signal<string>('');

  protected readonly _computedClass = computed(() => {
    const hostClasses = this._hostClasses();
    const userCls = this.userCls();
    return hlm(iconVariants({}), hostClasses, userCls);
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
  public set name(value: IconName) {
    this._name.set(value);
  }

  @Input()
  public set untypedName(value: string) {
    this._name.set(value);
  }

  @Input()
  public set size(value: number | string) {
    this._size.set(Number(value));
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
