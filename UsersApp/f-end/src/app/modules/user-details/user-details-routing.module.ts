import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RightsGuard } from './../../shared/guards/rights.guard';
import { SafeChangesGuard } from './../../shared/guards/safe-changes.guard';
import { AuthGuard } from './../../shared/guards/auth.guard';
import { UserPageEditComponent } from './user-page-edit/user-page-edit.component';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [
  { path: '', component: UserDetailsComponent },
  { path: 'edit', canDeactivate: [SafeChangesGuard], canActivate: [AuthGuard, RightsGuard], component: UserPageEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }
