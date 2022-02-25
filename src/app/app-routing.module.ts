import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './game-details/game-details.component';
import { NorthAmericaComponent } from './modules/baseball/components/north-america/north-america.component';
import { CricketComponent } from './modules/cricket/cricket.component';
import { D23Component } from './modules/football/components/d23/d23.component';
import { FcsComponent } from './modules/football/components/fcs/fcs.component';
import { NcaafComponent } from './modules/football/components/ncaaf/ncaaf.component';
import { NflComponent } from './modules/football/components/nfl/nfl.component';
import { ChampionsTourComponent } from './modules/golf/components/champions-tour/champions-tour.component';
import { EuropeanTourComponent } from './modules/golf/components/european-tour/european-tour.component';
import { KornFerryTourComponent } from './modules/golf/components/korn-ferry-tour/korn-ferry-tour.component';
import { LpgaComponent } from './modules/golf/components/lpga/lpga.component';
import { PgaComponent } from './modules/golf/components/pga/pga.component';
import { AhlComponent } from './modules/hockey/components/ahl/ahl.component';
import { EchlComponent } from './modules/hockey/components/echl/echl.component';
import { NcaahComponent } from './modules/hockey/components/ncaah/ncaah.component';
import { NhlComponent } from './modules/hockey/components/nhl/nhl.component';
import { RugbyunionComponent } from './modules/rugbyunion/rugbyunion/rugbyunion.component';
import { SoccerComponent } from './modules/soccer/components/soccer/soccer.component';

const routes: Routes = [
  { path: 'game-details/:id', component: GameDetailsComponent },
  { path: 'nba', redirectTo: '/basketball/nba', pathMatch: 'full' },
  { path: 'wnba', redirectTo: '/basketball/wnba', pathMatch: 'full' },
  { path: 'nbdl', redirectTo: '/basketball/g-league', pathMatch: 'full' },
  { path: 'd-league', redirectTo: '/basketball/g-league', pathMatch: 'full' },
  { path: 'g-league', redirectTo: '/basketball/g-league', pathMatch: 'full' },
  { path: 'ncaam', redirectTo: '/basketball/ncaam', pathMatch: 'full' },
  { path: 'ncaambb', redirectTo: '/basketball/ncaam', pathMatch: 'full' },
  { path: 'ncaaw', redirectTo: '/basketball/ncaaw', pathMatch: 'full' },
  { path: 'ncaawbb', redirectTo: '/basketball/ncaawbb', pathMatch: 'full' },

  {
    path: 'basketball',
    loadChildren: () =>
      import('./modules/basketball/basketball.module').then(
        (m) => m.BasketballModule
      ),
  },
  { path: 'nfl', component: NflComponent },
  { path: 'mlb', component: NorthAmericaComponent },
  { path: 'ncaaf', component: NcaafComponent },
  { path: 'fcs', component: FcsComponent },
  { path: 'd23', component: D23Component },
  { path: 'soccer', component: SoccerComponent },
  { path: 'ahl', component: AhlComponent },
  { path: 'nhl', component: NhlComponent },
  { path: 'ncaah', component: NcaahComponent },
  { path: 'echl', component: EchlComponent },
  { path: 'cricket', component: CricketComponent },
  { path: 'pga', component: PgaComponent},
  { path: 'lpga', component: LpgaComponent},
  { path: 'european-tour', component: EuropeanTourComponent},
  { path: 'champions-tour', component: ChampionsTourComponent},
  { path: 'kornferry', component: KornFerryTourComponent},
  { path: 'rugby', component: RugbyunionComponent},
  { path: 'rugbyunion', component: RugbyunionComponent},
  { path: '**', redirectTo: '/basketball/nba', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
