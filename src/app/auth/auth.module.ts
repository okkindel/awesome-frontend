import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './views';

const COMPONENTS = [LoginComponent];

@NgModule({
  imports: [SharedModule, AuthRoutingModule, FormsModule],
  declarations: [...COMPONENTS],
})
export class AuthModule {}
