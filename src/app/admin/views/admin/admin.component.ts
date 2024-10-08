import { Component, inject } from '@angular/core';
import { UserService } from '@api/services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  public readonly user$ = this._userService.user$;

  public readonly routes = [
    {
      title: 'Dashboard',
      icon: 'List',
      link: ['/admin', 'list'],
    },
    {
      title: 'Add',
      icon: 'FilePlus',
      link: ['/admin', 'create'],
    },
  ];

  public logout(): void {
    this._userService.logout().subscribe(() => {
      this._router.navigate(['/']);
    });
  }
}
