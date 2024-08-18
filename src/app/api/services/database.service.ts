import {
  ElementsDictionary,
  ElementsResponse,
  Collection,
  Elements,
} from '@api/models';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { type Models } from 'appwrite';

import { AppwriteService } from './appwrite.service';

@Injectable()
export class DatabaseService {
  private readonly _appwriteService = inject(AppwriteService);

  public list<T extends Collection>(
    collection: T,
    queries?: string[],
  ): Observable<Models.DocumentList<ElementsResponse<T>>> {
    const id = ElementsDictionary[collection];

    return from(
      this._appwriteService.databases.listDocuments('elements', id, queries),
    ) as Observable<Models.DocumentList<ElementsResponse<T>>>;
  }

  public get<T extends Collection>(
    collection: T,
    documentId: string,
    queries?: string[],
  ): Observable<ElementsResponse<T>> {
    const id = ElementsDictionary[collection];

    return from(
      this._appwriteService.databases.getDocument(
        'elements',
        id,
        documentId,
        queries,
      ),
    ) as Observable<ElementsResponse<T>>;
  }

  public add<T extends Collection>(
    collection: T,
    data: Elements[T],
  ): Observable<ElementsResponse<T>> {
    const id = ElementsDictionary[collection];
    const uuid = this._appwriteService.ID.unique();

    return from(
      this._appwriteService.databases.createDocument(
        'elements',
        id,
        uuid,
        data,
      ),
    ) as Observable<ElementsResponse<T>>;
  }

  public update<T extends Collection>(
    collection: T,
    documentId: string,
    data: Elements[T],
  ): Observable<ElementsResponse<T>> {
    const id = ElementsDictionary[collection];

    return from(
      this._appwriteService.databases.updateDocument(
        'elements',
        id,
        documentId,
        data,
      ),
    ) as Observable<ElementsResponse<T>>;
  }

  public remove<T extends Collection>(
    collection: T,
    documentId: string,
  ): Observable<unknown> {
    const id = ElementsDictionary[collection];

    return from(
      this._appwriteService.databases.deleteDocument(
        'elements',
        id,
        documentId,
      ),
    ) as Observable<unknown>;
  }
}
