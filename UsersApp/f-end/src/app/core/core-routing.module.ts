import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RightsGuard } from './../shared/guards/rights.guard';
import { AuthGuard } from './../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule) },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'my-page',
    canActivate: [AuthGuard],
    loadChildren: () => import('../modules/my-page/my-page.module').then(m => m.MyPageModule)
  },
  {
    path: 'users/:id',
    canActivate: [AuthGuard, RightsGuard],
    loadChildren: () => import('../modules/user-details/user-details.module').then(m => m.UserDetailsModule)
  },
  { path: 'users', canActivate: [AuthGuard], loadChildren: () => import('../modules/users/users.module').then(m => m.UsersModule) },

  { path: '**', loadChildren: () => import('../modules/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
