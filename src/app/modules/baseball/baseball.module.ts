import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NorthAmericaComponent } from './components/north-america/north-america.component';
import { BoxscoreComponent } from './components/boxscore/boxscore.component';
import { NcaaBaseballComponent } from './ncaa-baseball/ncaa-baseball.component';
import { NpbComponent } from './components/npb/npb.component';
import { KboComponent } from './components/kbo/kbo.component';
import { CpblComponent } from './components/cpbl/cpbl.component';
import { NorthAmericaStandingsComponent } from './components/north-america-standings/north-america-standings.component';



@NgModule({
  declarations: [
    // NorthAmericaComponent,
    // BoxscoreComponent,
    NcaaBaseballComponent,
    NorthAmericaStandingsComponent,
    // KboComponent,
    // CpblComponent,
    // NpbComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseballModule { }
