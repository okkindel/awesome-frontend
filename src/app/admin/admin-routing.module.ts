import { RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  AdminCreateComponent,
  AdminListComponent,
  AdminComponent,
} from './views';
import { UserService } from '../api/services';

const routes: Routes = [
  {
    canActivate: [
      (): Observable<boolean> => {
        const service = inject(UserService);
        return service.user$.pipe(map((user) => !!user));
      },
    ],
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'list',
        component: AdminListComponent,
      },
      {
        path: 'create',
        component: AdminCreateComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
