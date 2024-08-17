import { TypewriterService, UserService } from '@shared/services';
import { Component, inject } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _typewriterService = inject(TypewriterService);
  private readonly _userService = inject(UserService);

  private readonly _titles = [
    'Your Next Project',
    'Your Next Idea',
    'Your Next Startup',
    'Your Next Business',
  ];

  public readonly userData$ = this._userService.user$;
  public readonly typedText$ = this._typewriterService.getTypewriterEffect(
    this._titles,
  );

  public logout(): void {
    this._userService.logout();
  }
}
