import { Component, inject, signal } from '@angular/core';
import { LibraryType, Library, Dto } from '@api/models';
import { DatabaseService } from '@api/services';
import { Observable, map, tap } from 'rxjs';
import { Query } from 'appwrite';

@Component({
  selector: 'cf-tables',
  template: `
    <main class="container mx-auto pt-8" id="main">
      @if (!isLoaded()) {
        @for (_ of [].constructor(5); track $index) {
          <hlm-skeleton class="h-12 w-40" />
          <section class="my-8 grid h-96 grid-cols-4 gap-4">
            <hlm-skeleton class="size-full" />
            <hlm-skeleton class="size-full" />
            <hlm-skeleton class="size-full" />
            <hlm-skeleton class="size-full" />
          </section>
        }
      }

      @for (
        type of tablesList$ | async | keyvalue: keyValSort;
        track type.key
      ) {
        <h2 class="text-2xl font-semibold">{{ type.key }}</h2>
        <hlm-table class="my-8 w-full min-w-[400px]">
          <hlm-trow>
            <hlm-th class="w-20"></hlm-th>
            <hlm-th class="w-64">Name</hlm-th>
            <hlm-th class="w-40">Technology</hlm-th>
            <hlm-th>Description</hlm-th>
          </hlm-trow>
          @for (element of type.value; track element.$id) {
            <hlm-trow>
              <hlm-td truncate class="w-20">
                <img [src]="element.icon" class="size-8" />
              </hlm-td>
              <hlm-td class="w-64">
                <a
                  [class.font-semibold]="element.important"
                  [href]="element.url"
                  class="underline"
                  target="_blank"
                >
                  {{ element.name }}
                </a>
              </hlm-td>
              <hlm-td class="w-40">{{ element.technology }}</hlm-td>
              <hlm-td>
                {{ element.description }}
              </hlm-td>
            </hlm-trow>
          }
        </hlm-table>
      }
    </main>
  `,
})
export class TablesComponent {
  private readonly _databaseService = inject(DatabaseService);

  public keyValSort = (_a: { key: string }, _b: { key: string }): number => 0;
  public isLoaded = signal<boolean>(false);

  public readonly tablesList$: Observable<Record<LibraryType, Dto<Library>[]>> =
    this._databaseService.list('library', [Query.limit(1000)]).pipe(
      map((list) => {
        const elements = list.documents
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => (a.important ? -1 : b.important ? 1 : 0));

        const types = Object.values(LibraryType);
        return types.reduce(
          (acc: Record<LibraryType, Dto<Library>[]>, type) => {
            acc[type] = elements.filter((doc) => doc.type === type);
            return acc;
          },
          {} as Record<LibraryType, Dto<Library>[]>,
        );
      }),
      tap(() => this.isLoaded.set(true)),
    );
}
