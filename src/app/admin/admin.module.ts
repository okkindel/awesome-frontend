import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './views';

const COMPONENTS = [AdminComponent];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],

  declarations: [...COMPONENTS],
})
export class AdminModule {}
