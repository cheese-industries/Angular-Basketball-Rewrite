import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ScoreComponent } from './score/score.component';
import { NflComponent } from './nfl/nfl.component';
import { NhlComponent } from './nhl/nhl.component';
import { MlbComponent } from './mlb/mlb.component';

const routes: Routes = [
  {path: 'game-details/:id', component: GameDetailsComponent},
  {path: 'nfl', component: NflComponent},
  {path: 'nhl', component: NhlComponent},
  {path: 'mlb', component: MlbComponent},
  {path: 'nba', component: ScoreComponent},
  {path: '**', component: ScoreComponent},
  
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
