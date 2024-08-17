import { RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';

import { AppwriteService } from './../shared/services/appwrite.service';
import { AdminComponent } from './views';

const routes: Routes = [
  {
    canActivate: [
      (): Promise<boolean> => {
        const service = inject(AppwriteService);
        return service.account.get().then(Boolean);
      },
    ],
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
