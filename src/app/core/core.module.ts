import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { TablesComponent, HeroComponent } from './containers';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './views';

const COMPONENTS = [HomeComponent, HeroComponent, TablesComponent];

@NgModule({
  imports: [CoreRoutingModule, SharedModule],
  declarations: [...COMPONENTS],
})
export class CoreModule {}
