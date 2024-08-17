import type { ClassValue } from 'clsx';

import {
  type DoCheck,
  Directive,
  Injector,
  computed,
  effect,
  inject,
  signal,
  Input,
  input,
} from '@angular/core';
import {
  ErrorStateMatcher,
  ErrorStateTracker,
} from '@spartan-ng/ui-forms-brain';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { BrnFormFieldControl } from '@spartan-ng/ui-form-field-brain';
import { type VariantProps, cva } from 'class-variance-authority';
import { hlm } from '@spartan-ng/ui-core';

export const inputVariants = cva(
  'flex rounded-md border border-input bg-transparent text-sm font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
      error: {
        auto: '[&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:text-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
        true: 'border-destructive text-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      error: 'auto',
    },
  },
);
type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  providers: [
    {
      provide: BrnFormFieldControl,
      useExisting: HlmInputDirective,
    },
  ],
})
export class HlmInputDirective implements BrnFormFieldControl, DoCheck {
  private readonly _size = signal<InputVariants['size']>('default');
  @Input()
  public set size(value: InputVariants['size']) {
    this._size.set(value);
  }

  private readonly _error = signal<InputVariants['error']>('auto');
  @Input()
  public set error(value: InputVariants['error']) {
    this._error.set(value);
  }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      inputVariants({ size: this._size(), error: this._error() }),
      this.userClass(),
    ),
  );

  private _injector = inject(Injector);

  public ngControl: NgControl | null = this._injector.get(NgControl, null);

  public errorStateTracker: ErrorStateTracker;

  private _defaultErrorStateMatcher = inject(ErrorStateMatcher);
  private _parentForm = inject(NgForm, { optional: true });
  private _parentFormGroup = inject(FormGroupDirective, { optional: true });

  public errorState = computed(() => this.errorStateTracker.errorState());

  constructor() {
    this.errorStateTracker = new ErrorStateTracker(
      this._defaultErrorStateMatcher,
      this.ngControl,
      this._parentFormGroup,
      this._parentForm,
    );

    effect(
      () => {
        if (this.ngControl) {
          this.error = this.errorStateTracker.errorState();
        }
      },
      { allowSignalWrites: true },
    );
  }

  public ngDoCheck(): void {
    this.errorStateTracker.updateErrorState();
  }
}
