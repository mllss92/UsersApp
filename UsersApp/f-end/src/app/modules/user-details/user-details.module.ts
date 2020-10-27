import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { SharedModule } from '../shared/shared.module';
import { UserPageEditComponent } from './user-page-edit/user-page-edit.component';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UserPageEditComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserDetailsModule { }
