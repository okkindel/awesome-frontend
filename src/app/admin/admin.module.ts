import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  AdminCreateComponent,
  AdminUpdateComponent,
  AdminListComponent,
  AdminComponent,
} from './views';
import { AdminRoutingModule } from './admin-routing.module';
import { ElementFormComponent } from './containers';

const COMPONENTS = [
  ElementFormComponent,
  AdminCreateComponent,
  AdminUpdateComponent,
  AdminListComponent,
  AdminComponent,
];

@NgModule({
  imports: [SharedModule, AdminRoutingModule, ReactiveFormsModule],

  declarations: [...COMPONENTS],
})
export class AdminModule {}
