import {
  databaseDictionary,
  Collection,
  Response,
  Database,
} from '@api/models';
import { RealtimeResponseEvent, type Models } from 'appwrite';
import { environment } from '@environments/environment';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppwriteService } from './appwrite.service';

@Injectable()
export class DatabaseService {
  private readonly _appwriteService = inject(AppwriteService);

  public list<T extends Collection>(
    collection: T,
    queries?: string[],
  ): Promise<Models.DocumentList<Response<T>>> {
    return this._appwriteService.databases.listDocuments(
      environment.appwrite.database_id,
      databaseDictionary[collection],
      queries,
    ) as Promise<Models.DocumentList<Response<T>>>;
  }

  public get<T extends Collection>(
    collection: T,
    documentId: string,
    queries?: string[],
  ): Promise<Response<T>> {
    return this._appwriteService.databases.getDocument(
      environment.appwrite.database_id,
      databaseDictionary[collection],
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
      environment.appwrite.database_id,
      databaseDictionary[collection],
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
      environment.appwrite.database_id,
      databaseDictionary[collection],
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
      environment.appwrite.database_id,
      databaseDictionary[collection],
      documentId,
    ) as Promise<unknown>;
  }

  public listen<T extends Collection>(
    collection: T,
  ): Observable<RealtimeResponseEvent<Response<T>>> {
    return new Observable<RealtimeResponseEvent<Response<T>>>((observer) => {
      const unsubscribe = this._appwriteService.databases.client.subscribe(
        `databases.${environment.appwrite.database_id}.collections.${
          databaseDictionary[collection]
        }.documents`,
        (payload: RealtimeResponseEvent<Response<T>>) => {
          observer.next(payload);
        },
      );
      return () => unsubscribe();
    });
  }
}
