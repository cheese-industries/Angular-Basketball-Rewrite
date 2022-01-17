import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketballComponent } from './components/basketball/basketball.component';

const routes: Routes = [
  {path: ':league', component: BasketballComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketballRoutingModule { }
