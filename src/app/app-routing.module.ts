import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './game-details/game-details.component';
import { CricketComponent } from './modules/cricket/cricket.component';
import { AhlComponent } from './modules/hockey/components/ahl/ahl.component';
import { EchlComponent } from './modules/hockey/components/echl/echl.component';
import { NcaahComponent } from './modules/hockey/components/ncaah/ncaah.component';
import { NhlComponent } from './modules/hockey/components/nhl/nhl.component';
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
    { path: 'soccer', component: SoccerComponent },
    { path: 'ahl', component: AhlComponent },
    { path: 'nhl', component: NhlComponent },
    { path: 'ncaah', component: NcaahComponent },
    { path: 'echl', component: EchlComponent },
    { path: 'cricket', component: CricketComponent },
  { path: '**', redirectTo: '/basketball/nba', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
