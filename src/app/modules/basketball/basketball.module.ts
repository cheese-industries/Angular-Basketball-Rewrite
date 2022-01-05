import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BasketballRoutingModule } from './basketball-routing.module';
import { SharedComponent } from './components/shared/shared.component';


@NgModule({
  declarations: [
  
    SharedComponent,
  ],
  imports: [
    CommonModule,
    BasketballRoutingModule
  ]
})
export class BasketballModule { }
