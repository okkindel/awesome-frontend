import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { LibraryType, Library, Dto } from '@api/models';
import { Component, inject } from '@angular/core';
import { DatabaseService } from '@api/services';
import { Query } from 'appwrite';

@Component({
  templateUrl: './admin-list.component.html',
})
export class AdminListComponent {
  // prettier-ignore
  public readonly displayedColumns = ['icon', 'technology', 'name', 'description', 'type', 'actions'];
  private readonly _databaseService = inject(DatabaseService);

  public readonly query = injectQuery(() => ({
    queryKey: ['libraries'],
    queryFn: (): Promise<Dto<Library>[]> =>
      this._databaseService
        .list('library', [Query.limit(1000)])
        .then((res) => res.documents)
        .then((documents) =>
          documents
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => (a.important ? -1 : b.important ? 1 : 0))
            .sort(
              (a, b) =>
                Object.values(LibraryType).indexOf(a.type) -
                Object.values(LibraryType).indexOf(b.type),
            ),
        ),
  }));

  public readonly deleteMutation = injectMutation((client) => ({
    mutationFn: (id: string): Promise<unknown> =>
      this._databaseService.remove('library', id),
    onSuccess: (): void => {
      client.invalidateQueries({ queryKey: ['libraries'] });
    },
  }));
}
