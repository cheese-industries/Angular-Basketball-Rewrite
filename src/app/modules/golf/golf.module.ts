import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PgaComponent } from './components/pga/pga.component';
import { LpgaComponent } from './components/lpga/lpga.component';
import { ChampionsTourComponent } from './components/champions-tour/champions-tour.component';
import { KornFerryTourComponent } from './components/korn-ferry-tour/korn-ferry-tour.component';
import { EuropeanTourComponent } from './components/european-tour/european-tour.component';



@NgModule({
  declarations: [

  
    LpgaComponent,
        ChampionsTourComponent,
        KornFerryTourComponent,
        EuropeanTourComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GolfModule { }
