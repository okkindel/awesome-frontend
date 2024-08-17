import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  from,
  tap,
  of,
} from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { type Models } from 'appwrite';

import { AppwriteService } from './appwrite.service';

@Injectable()
export class UserService {
  private readonly _appwriteService = inject(AppwriteService);

  public readonly user$ =
    new BehaviorSubject<Models.User<Models.Preferences> | null>(null);

  public login(
    email: string,
    password: string,
  ): Observable<Models.User<Models.Preferences>> {
    return from(
      this._appwriteService.account.createEmailPasswordSession(email, password),
    ).pipe(switchMap(() => this._refreshUser()));
  }

  public logout(): Observable<unknown> {
    return from(this._appwriteService.account.deleteSession('current')).pipe(
      tap(() => this.user$.next(null)),
    );
  }

  public init(): Observable<Models.User<Models.Preferences> | null> {
    return this._refreshUser().pipe(catchError(() => of(null)));
  }

  private _refreshUser(): Observable<Models.User<Models.Preferences>> {
    return from(this._appwriteService.account.get()).pipe(
      tap((user) => this.user$.next(user)),
    );
  }
}
