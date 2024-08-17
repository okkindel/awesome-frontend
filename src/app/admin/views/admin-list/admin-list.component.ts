import { Component, inject } from '@angular/core';
import { ElementsService } from '@api/services';

@Component({
  template: `
    @let elements = elements$ | async;

    {{ elements | json }}
  `,
})
export class AdminListComponent {
  private readonly _elementsService = inject(ElementsService);

  public readonly elements$ = this._elementsService.getElements('library');
}
