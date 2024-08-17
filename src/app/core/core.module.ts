import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';

const COMPONENTS: [] = [];

@NgModule({
  imports: [CoreRoutingModule, SharedModule],
  declarations: [...COMPONENTS],
})
export class CoreModule {}
