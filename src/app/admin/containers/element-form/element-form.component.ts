import {
  EventEmitter,
  DestroyRef,
  Component,
  inject,
  Output,
  Input,
} from '@angular/core';
import { LibraryTechnology, LibraryType, Library } from '@api/models';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'cf-element-form',
  templateUrl: './element-form.component.html',
})
export class ElementFormComponent {
  private readonly _destroyRef = inject(DestroyRef);

  public readonly technologies = Object.values(LibraryTechnology);
  public readonly types = Object.values(LibraryType);

  @Input() public set value(value: Library | null) {
    !!value && this.form.patchValue(value);
  }

  @Output() public readonly valueChange = new EventEmitter<Library>();

  public readonly form = new FormGroup({
    type: new FormControl<LibraryType | null>(null, [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    url: new FormControl<string>('', [Validators.required]),
    important: new FormControl<boolean>(false),
    icon: new FormControl<string | null>(null),
    technology: new FormControl<LibraryTechnology | null>(null, [
      Validators.required,
    ]),
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this.valueChange.emit(this.form.value as Library);
    }
  }
}
