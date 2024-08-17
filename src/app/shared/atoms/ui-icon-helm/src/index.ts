import { NgModule } from '@angular/core';

import { HlmIconComponent } from './lib/hlm-icon.component';

export * from './lib/hlm-icon.component';

@NgModule({
  imports: [HlmIconComponent],
  exports: [HlmIconComponent],
})
export class HlmIconModule {}
