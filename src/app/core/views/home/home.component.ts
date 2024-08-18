import { Component, inject } from '@angular/core';
import { UserService } from '@api/services';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _userService = inject(UserService);

  public readonly userData$ = this._userService.user$;

  public logout(): void {
    this._userService.logout();
  }
}
