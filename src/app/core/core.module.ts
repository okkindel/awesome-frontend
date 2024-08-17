import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './views';

const COMPONENTS = [HomeComponent];

@NgModule({
  imports: [CoreRoutingModule, SharedModule],
  declarations: [...COMPONENTS],
})
export class CoreModule {}
