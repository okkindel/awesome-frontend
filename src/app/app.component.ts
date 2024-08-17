import { Component } from '@angular/core';

@Component({
  selector: 'front-root',
  host: {
    class: 'h-full',
  },
  template: `
    <hlm-toaster />
    <router-outlet />
  `,
})
export class AppComponent {}
