import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 3000,
      preventDuplicates: true
    })
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
