import { injectQuery } from '@tanstack/angular-query-experimental';
import { LibraryType, Library, Dto } from '@api/models';
import { Component, inject } from '@angular/core';
import { DatabaseService } from '@api/services';
import { Query } from 'appwrite';

@Component({
  selector: 'cf-home-tables',
  template: `
    <main class="container mx-auto py-8" id="main">
      @if (!query.isFetched()) {
        @for (_ of [].constructor(5); track $index) {
          <hlm-skeleton class="h-12 w-40" />
          <section class="my-8 grid h-96 grid-cols-2 gap-4 lg:grid-cols-4">
            <hlm-skeleton class="size-full" />
            <hlm-skeleton class="size-full" />
            <hlm-skeleton class="size-full" />
            <hlm-skeleton class="size-full" />
          </section>
        }
      }

      @for (type of query.data() | keyvalue: keyValSort; track type.key) {
        <h2 class="text-2xl font-semibold">{{ type.key }}</h2>
        <hlm-table class="my-8 w-full">
          <hlm-trow>
            <hlm-th class="w-12 lg:w-20"></hlm-th>
            <hlm-th class="w-32 lg:w-64">Name</hlm-th>
            <hlm-th class="w-20 lg:w-40">Technology</hlm-th>
            <hlm-th>Description</hlm-th>
          </hlm-trow>
          @for (element of type.value; track element.$id) {
            <hlm-trow>
              <hlm-td truncate class="w-12 p-2 lg:w-20 lg:p-4">
                @if (element.icon) {
                  <img [src]="element.icon" class="size-8" />
                }
              </hlm-td>
              <hlm-td class="w-32 lg:w-64">
                <a
                  [class.font-semibold]="element.important"
                  [href]="element.url"
                  class="underline"
                  target="_blank"
                >
                  {{ element.name }}
                </a>
              </hlm-td>
              <hlm-td class="w-20 lg:w-40">
                <p
                  [type]="element.technology"
                  variant="secondary"
                  cfTechnologyBadge
                  hlmBadge
                >
                  {{ element.technology }}
                </p>
              </hlm-td>
              <hlm-td class="flex-1">
                {{ element.description }}
              </hlm-td>
            </hlm-trow>
          }
        </hlm-table>
      }
    </main>
  `,
})
export class HomeTablesComponent {
  private readonly _databaseService = inject(DatabaseService);

  public readonly query = injectQuery(() => ({
    queryKey: ['libraries'],
    queryFn: (): Promise<Record<LibraryType, Dto<Library>[]>> =>
      this._databaseService
        .list('library', [Query.limit(1000)])
        .then((res) => res.documents)
        .then((documents) => {
          const types = Object.values(LibraryType);
          const docs = documents
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => (a.important ? -1 : b.important ? 1 : 0));

          return types.reduce(
            (acc: Record<LibraryType, Dto<Library>[]>, type) => {
              acc[type] = docs.filter((doc) => doc.type === type);
              return acc;
            },
            {} as Record<LibraryType, Dto<Library>[]>,
          );
        }),
  }));

  public readonly keyValSort = (
    _a: { key: string },
    _b: { key: string },
  ): number => 0;
}
