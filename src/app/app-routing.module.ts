import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GLeagueComponent } from './modules/basketball/components/g-league/g-league.component';
import { NcaamenComponent } from './modules/basketball/components/ncaamen/ncaamen.component';
import { NcaawomenComponent } from './modules/basketball/components/ncaawomen/ncaawomen.component';
import { NbaComponent } from './modules/basketball/components/nba/nba.component';
import { WnbaComponent } from './modules/basketball/components/wnba/wnba.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { BasketballComponent } from './modules/basketball/components/basketball/basketball.component';

const routes: Routes = [
  {path: 'game-details/:id', component: GameDetailsComponent},
  {path: 'ncaam', component: NcaamenComponent},
  {path: 'ncaaw', component: NcaawomenComponent},
  {path: 'g-league', component: GLeagueComponent},
  {path: 'wnba', component: WnbaComponent},
  {path: 'nba', component: NbaComponent},
  {path: 'basketball/:league', component: BasketballComponent},
  {path: '**', component: NbaComponent},

  
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
