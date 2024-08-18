import { LibraryTechnology, LibraryType, Library } from '@api/models';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { DatabaseService } from '@api/services';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  templateUrl: './admin-create.component.html',
})
export class AdminCreateComponent {
  private readonly _databaseService = inject(DatabaseService);
  private readonly _router = inject(Router);

  public readonly technologies = Object.values(LibraryTechnology);
  public readonly types = Object.values(LibraryType);

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
    const formValue = this.form.getRawValue() as Library;

    this._databaseService.add('library', formValue).subscribe({
      next: () => {
        this._router.navigate(['/', 'admin']);
      },
      error: (error) => {
        toast(error.message);
      },
    });
  }
}
