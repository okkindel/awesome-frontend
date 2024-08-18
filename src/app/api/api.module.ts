import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

import { AppwriteService, DatabaseService, UserService } from './services';

@NgModule({
  providers: [
    AppwriteService,
    DatabaseService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: UserService) => {
        return (): Observable<unknown> => service.init();
      },
      deps: [UserService],
      multi: true,
    },
  ],
})
export class ApiModule {}
