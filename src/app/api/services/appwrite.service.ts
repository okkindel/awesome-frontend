import { Databases, Account, Client, ID } from 'appwrite';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AppwriteService {
  private readonly _client = new Client();
  public readonly databases: Databases;
  public readonly account: Account;

  constructor() {
    this._client
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.project);

    this.databases = new Databases(this._client);
    this.account = new Account(this._client);
  }

  public get ID(): typeof ID {
    return ID;
  }
}
