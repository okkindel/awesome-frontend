import { Component, inject } from '@angular/core';
import { DatabaseService } from '@api/services';

@Component({
  template: `
    @let elements = elements$ | async;

    {{ elements | json }}
  `,
})
export class AdminListComponent {
  private readonly _databaseService = inject(DatabaseService);

  public readonly elements$ = this._databaseService.getElements('library');
}
