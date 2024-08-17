import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

import { AppwriteService, UserService } from './services';

@NgModule({
  providers: [
    AppwriteService,
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
