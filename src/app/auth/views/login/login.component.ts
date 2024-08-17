import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { UserService } from '@api/services';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public login(): void {
    const { email, password } = this.form.value;
    this._userService.login(email!, password!).subscribe({
      next: () => {
        this._router.navigate(['/', 'admin']);
      },
      error: (error) => {
        toast(error.message);
      },
    });
  }
}
