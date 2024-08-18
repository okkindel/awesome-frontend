import {
  ElementsDictionary,
  ElementsResponse,
  Collection,
  Elements,
} from '@api/models';
import { environment } from '@environments/environment';
import { Injectable, inject } from '@angular/core';
import { type Models } from 'appwrite';

import { AppwriteService } from './appwrite.service';

@Injectable()
export class DatabaseService {
  private readonly _appwriteService = inject(AppwriteService);

  public list<T extends Collection>(
    collection: T,
    queries?: string[],
  ): Promise<Models.DocumentList<ElementsResponse<T>>> {
    return this._appwriteService.databases.listDocuments(
      environment.appwrite.database,
      ElementsDictionary[collection],
      queries,
    ) as Promise<Models.DocumentList<ElementsResponse<T>>>;
  }

  public get<T extends Collection>(
    collection: T,
    documentId: string,
    queries?: string[],
  ): Promise<ElementsResponse<T>> {
    return this._appwriteService.databases.getDocument(
      environment.appwrite.database,
      ElementsDictionary[collection],
      documentId,
      queries,
    ) as Promise<ElementsResponse<T>>;
  }

  public add<T extends Collection>(
    collection: T,
    data: Partial<Omit<Elements[T], keyof Models.Document>>,
  ): Promise<ElementsResponse<T>> {
    return this._appwriteService.databases.createDocument(
      environment.appwrite.database,
      ElementsDictionary[collection],
      this._appwriteService.ID.unique(),
      data,
    ) as Promise<ElementsResponse<T>>;
  }

  public update<T extends Collection>(
    collection: T,
    documentId: string,
    data: Partial<Omit<Elements[T], keyof Models.Document>>,
  ): Promise<ElementsResponse<T>> {
    return this._appwriteService.databases.updateDocument(
      environment.appwrite.database,
      ElementsDictionary[collection],
      documentId,
      data,
    ) as Promise<ElementsResponse<T>>;
  }

  public remove<T extends Collection>(
    collection: T,
    documentId: string,
  ): Promise<unknown> {
    return this._appwriteService.databases.deleteDocument(
      environment.appwrite.database,
      ElementsDictionary[collection],
      documentId,
    ) as Promise<unknown>;
  }
}
