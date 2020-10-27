import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafeChangesGuard } from './../../shared/guards/safe-changes.guard';
import { AuthGuard } from './../../shared/guards/auth.guard';
import { MyPageEditComponent } from './my-page-edit/my-page-edit.component';
import { MyPageComponent } from './my-page.component';

const routes: Routes = [
  { path: '', component: MyPageComponent },
  { path: 'edit', canDeactivate: [SafeChangesGuard], canActivate: [AuthGuard], component: MyPageEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPageRoutingModule { }
