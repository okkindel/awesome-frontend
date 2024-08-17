import { BehaviorSubject, Observable, from } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { type Models } from 'appwrite';

import { AppwriteService } from './appwrite.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _appwriteService = inject(AppwriteService);

  public readonly user$ =
    new BehaviorSubject<Models.User<Models.Preferences> | null>(null);

  constructor() {
    this._refreshUser();
  }

  private _refreshUser(): void {
    this._appwriteService.account.get().then((user) => {
      this.user$.next(user);
    });
  }

  public login(email: string, password: string): Observable<Models.Session> {
    return from(
      this._appwriteService.account.createEmailPasswordSession(email, password),
    );
  }

  public logout(): void {
    this._appwriteService.account.deleteSession('current').then(() => {
      this.user$.next(null);
    });
  }
}
