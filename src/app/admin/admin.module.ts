import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import {
  AdminCreateComponent,
  AdminListComponent,
  AdminComponent,
} from './views';
import { AdminRoutingModule } from './admin-routing.module';

const COMPONENTS = [AdminComponent, AdminListComponent, AdminCreateComponent];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],

  declarations: [...COMPONENTS],
})
export class AdminModule {}
