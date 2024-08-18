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

  public getElements<T extends Collection>(
    collection: T,
  ): Observable<Models.DocumentList<ElementsResponse<T>>> {
    const id = ElementsDictionary[collection];

    return from(
      this._appwriteService.databases.listDocuments('elements', id),
    ) as Observable<Models.DocumentList<ElementsResponse<T>>>;
  }

  public getElement<T extends Collection>(
    collection: T,
    documentId: string,
  ): Observable<ElementsResponse<T>> {
    const id = ElementsDictionary[collection];

    return from(
      this._appwriteService.databases.getDocument('elements', id, documentId),
    ) as Observable<ElementsResponse<T>>;
  }

  public createElement<T extends Collection>(
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
}
