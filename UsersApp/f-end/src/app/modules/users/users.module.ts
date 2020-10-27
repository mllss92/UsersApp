import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';
import { ValidationErrMsgComponent } from './validation-err-msg/validation-err-msg.component';



@NgModule({
  declarations: [
    UsersComponent,
    AddComponent,
    ValidationErrMsgComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
