import { Component } from '@angular/core';

@Component({
  selector: 'cf-root',
  host: {
    class: 'h-full',
  },
  template: `
    <hlm-toaster />
    <router-outlet />
  `,
})
export class AppComponent {}
