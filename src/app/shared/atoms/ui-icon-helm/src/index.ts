import { provideIcons as provideIconsImport } from '@ng-icons/core';
import { NgModule } from '@angular/core';

import { HlmIconComponent } from './lib/hlm-icon.component';

export * from './lib/hlm-icon.component';

export const provideIcons = provideIconsImport;

@NgModule({
  imports: [HlmIconComponent],
  exports: [HlmIconComponent],
})
export class HlmIconModule {}
