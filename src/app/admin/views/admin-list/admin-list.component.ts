import { LibraryType, Document, Library } from '@api/models';
import { Component, inject, OnInit } from '@angular/core';
import { DatabaseService } from '@api/services';
import { Query } from 'appwrite';

const TYPE_ORDER = Object.values(LibraryType);

@Component({
  templateUrl: './admin-list.component.html',
})
export class AdminListComponent implements OnInit {
  private readonly _databaseService = inject(DatabaseService);
  public elements: Document<Library>[] = [];

  public readonly displayedColumns = [
    'icon',
    'technology',
    'name',
    'description',
    'type',
    'actions',
  ];

  public ngOnInit(): void {
    this._fetchElements();
  }

  public removeElement(id: string): void {
    this._databaseService.remove('library', id).subscribe(() => {
      this._fetchElements();
    });
  }

  private _fetchElements(): void {
    this._databaseService
      .list('library', [Query.limit(1000)])
      .subscribe((res) => {
        this.elements = res.documents
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => (a.important ? -1 : b.important ? 1 : 0))
          .sort(
            (a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type),
          );
      });
  }
}
