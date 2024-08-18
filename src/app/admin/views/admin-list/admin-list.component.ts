import { Component, inject, OnInit, signal } from '@angular/core';
import { LibraryType, Library, Dto } from '@api/models';
import { DatabaseService } from '@api/services';
import { Query } from 'appwrite';

const TYPE_ORDER = Object.values(LibraryType);

@Component({
  templateUrl: './admin-list.component.html',
})
export class AdminListComponent implements OnInit {
  // prettier-ignore
  public readonly displayedColumns = ['icon', 'technology', 'name', 'description', 'type', 'actions'];
  private readonly _databaseService = inject(DatabaseService);

  public isLoaded = signal<boolean>(false);
  public elements: Dto<Library>[] = [];

  public ngOnInit(): void {
    this._fetchElements();
  }

  public removeElement(id: string): void {
    this._databaseService.remove('library', id).subscribe(() => {
      this._fetchElements();
    });
  }

  private _fetchElements(): void {
    this.isLoaded.set(false);
    this._databaseService
      .list('library', [Query.limit(1000)])
      .subscribe((res) => {
        this.elements = res.documents
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => (a.important ? -1 : b.important ? 1 : 0))
          .sort(
            (a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type),
          );
        this.isLoaded.set(true);
      });
  }
}
