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
    canActivate: [
      (): Observable<boolean> => {
        const userService = inject(UserService);
        return userService.user$.pipe(map((user) => !!user));
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
        path: 'update/:id',
        resolve: {
          data: (route: ActivatedRouteSnapshot): Observable<Dto<Library>> => {
            const id = route.params['id'];
            const dbService = inject(DatabaseService);
            return dbService.get('library', id);
          },
        },
        component: AdminUpdateComponent,
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
