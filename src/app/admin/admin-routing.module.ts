import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { Library, Dto } from '@api/models';
import { Observable, map } from 'rxjs';

import {
  AdminCreateComponent,
  AdminUpdateComponent,
  AdminListComponent,
  AdminComponent,
} from './views';
import { DatabaseService, UserService } from '../api/services';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      (): Observable<boolean> =>
        inject(UserService).user$.pipe(map((user) => !!user)),
    ],
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
        path: 'update/:id',
        component: AdminUpdateComponent,
        resolve: {
          data: (route: ActivatedRouteSnapshot): Promise<Dto<Library>> =>
            inject(DatabaseService).get('library', route.params['id']),
        },
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
