import { LucideAngularModule, icons } from 'lucide-angular';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { AdminModule } from '@admin/admin.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { ApiModule } from '@api/api.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const GLOBAL_MODULES = [LucideAngularModule.pick(icons)];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...GLOBAL_MODULES,
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    SharedModule,
    AdminModule,
    AuthModule,
    CoreModule,
    ApiModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
