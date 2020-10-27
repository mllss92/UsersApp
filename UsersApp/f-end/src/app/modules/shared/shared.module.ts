import { RightsPipe } from './../../shared/pipes/rights.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [RightsPipe],
  imports: [
    CommonModule
  ],
  exports: [RightsPipe]
})
export class SharedModule { }
