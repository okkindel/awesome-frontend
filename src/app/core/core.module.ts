import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { HomeTablesComponent, HomeHeroComponent } from './containers';
import { CoreRoutingModule } from './core-routing.module';
import { TechnologyBadgeDirective } from './directives';
import { HomeComponent } from './views';

const COMPONENTS = [HomeComponent, HomeHeroComponent, HomeTablesComponent];
const DIRECTIVES = [TechnologyBadgeDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CoreRoutingModule, SharedModule],
})
export class CoreModule {}
