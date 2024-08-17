import { environment } from '@environments/environment.development';
import { Account, Client, ID } from 'appwrite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private readonly _client = new Client();
  public readonly account: Account;

  constructor() {
    this._client
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.project);

    this.account = new Account(this._client);
  }

  public get ID(): typeof ID {
    return ID;
  }
}
