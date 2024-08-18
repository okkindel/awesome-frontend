import { DbDictionary, Collection, Response, Database } from '@api/models';
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
  ): Promise<Models.DocumentList<Response<T>>> {
    return this._appwriteService.databases.listDocuments(
      environment.appwrite.database,
      DbDictionary[collection],
      queries,
    ) as Promise<Models.DocumentList<Response<T>>>;
  }

  public get<T extends Collection>(
    collection: T,
    documentId: string,
    queries?: string[],
  ): Promise<Response<T>> {
    return this._appwriteService.databases.getDocument(
      environment.appwrite.database,
      DbDictionary[collection],
      documentId,
      queries,
    ) as Promise<Response<T>>;
  }

  public add<T extends Collection>(
    collection: T,
    data: Partial<Omit<Database[T], keyof Models.Document>>,
    permissions?: string[],
  ): Promise<Response<T>> {
    return this._appwriteService.databases.createDocument(
      environment.appwrite.database,
      DbDictionary[collection],
      this._appwriteService.ID.unique(),
      data,
      permissions,
    ) as Promise<Response<T>>;
  }

  public update<T extends Collection>(
    collection: T,
    documentId: string,
    data: Partial<Omit<Database[T], keyof Models.Document>>,
    permissions?: string[],
  ): Promise<Response<T>> {
    return this._appwriteService.databases.updateDocument(
      environment.appwrite.database,
      DbDictionary[collection],
      documentId,
      data,
      permissions,
    ) as Promise<Response<T>>;
  }

  public remove<T extends Collection>(
    collection: T,
    documentId: string,
  ): Promise<unknown> {
    return this._appwriteService.databases.deleteDocument(
      environment.appwrite.database,
      DbDictionary[collection],
      documentId,
    ) as Promise<unknown>;
  }
}
