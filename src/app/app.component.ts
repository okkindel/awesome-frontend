import { Component } from '@angular/core';

@Component({
  host: { class: 'h-screen block' },
  selector: 'cf-root',
  template: `
    <hlm-toaster />
    <router-outlet />
  `,
})
export class AppComponent {}
