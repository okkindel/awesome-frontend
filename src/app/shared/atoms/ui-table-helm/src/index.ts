import { BrnTableImports } from '@spartan-ng/ui-table-brain';
import { NgModule } from '@angular/core';

import { HlmCaptionComponent } from './lib/hlm-caption.component';
import { HlmTableComponent } from './lib/hlm-table.component';
import { HlmTableDirective } from './lib/hlm-table.directive';
import { HlmTrowComponent } from './lib/hlm-trow.component';
import { HlmTdComponent } from './lib/hlm-td.component';
import { HlmThComponent } from './lib/hlm-th.component';

export { HlmCaptionComponent } from './lib/hlm-caption.component';
export { HlmTableComponent } from './lib/hlm-table.component';
export { HlmTableDirective } from './lib/hlm-table.directive';
export { HlmTrowComponent } from './lib/hlm-trow.component';
export { HlmTdComponent } from './lib/hlm-td.component';
export { HlmThComponent } from './lib/hlm-th.component';

export const HlmTableImports = [
  HlmTableComponent,
  HlmTableDirective,
  HlmCaptionComponent,
  HlmThComponent,
  HlmTdComponent,
  HlmTrowComponent,
] as const;

@NgModule({
  imports: [...HlmTableImports, ...BrnTableImports],
  exports: [...HlmTableImports, ...BrnTableImports],
})
export class HlmTableModule {}
