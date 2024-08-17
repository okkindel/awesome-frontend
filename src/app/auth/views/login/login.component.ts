import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppwriteService } from '@shared/services';

@Component({
  selector: 'front-login',
  template: `
    <div>
      <p>
        {{
          loggedInUser ? 'Logged in as ' + loggedInUser.name : 'Not logged in'
        }}
      </p>

      <div>
        <input
          frontInput
          type="email"
          placeholder="Email"
          [(ngModel)]="email"
        />
        <input
          frontInput
          type="password"
          placeholder="Password"
          [(ngModel)]="password"
        />
        <input frontInput type="text" placeholder="Name" [(ngModel)]="name" />

        <button frontBtn (click)="login(email, password)">Login</button>

        <button frontBtn (click)="register(email, password, name)">
          Register
        </button>

        <button frontBtn (click)="logout()">Logout</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _appwriteService = inject(AppwriteService);

  public loggedInUser: any = null;
  public email: string = '';
  public password: string = '';
  public name: string = '';

  public login(email: string, password: string): void {
    this._appwriteService.account
      .createEmailPasswordSession(email, password)
      .then(() => {
        this.loggedInUser = this._appwriteService.account.get();
      });
  }

  public register(email: string, password: string, name: string): void {
    this._appwriteService.account
      .create(this._appwriteService.ID.unique(), email, password, name)
      .then(() => {
        this.login(email, password);
      });
  }

  public logout(): void {
    this._appwriteService.account.deleteSession('current').then(() => {
      this.loggedInUser = null;
    });
  }
}
