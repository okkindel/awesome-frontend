import { injectMutation } from '@tanstack/angular-query-experimental';
import { Component, inject } from '@angular/core';
import { DatabaseService } from '@api/services';
import { Library, Dto } from '@api/models';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  template: `
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-bold tracking-tight">Add new technology</h2>
      <p class="mt-2 text-lg leading-8">
        Fill in the form below to add a new technology to the database.
      </p>
    </div>

    <cf-element-form (valueChange)="createMutation.mutate($event)" />
  `,
})
export class AdminCreateComponent {
  private readonly _databaseService = inject(DatabaseService);
  private readonly _router = inject(Router);

  public readonly createMutation = injectMutation(() => ({
    mutationFn: (value: Library): Promise<Dto<Library>> =>
      this._databaseService.add('library', value),
    onSuccess: (): void => {
      this._router.navigate(['/', 'admin']);
    },
    onError: (error): void => {
      toast(error.message);
    },
  }));
}
