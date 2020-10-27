import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page.component';
import { MyPageEditComponent } from './my-page-edit/my-page-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MyPageComponent,
    MyPageEditComponent
  ],
  imports: [
    CommonModule,
    MyPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MyPageModule { }
