import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { NHLPlayByPlay } from 'src/app/models/hockey/nhl/nhl-play-by-play';
import { NHLBoxscore } from 'src/app/models/hockey/nhl/nhl-boxscore';
import { NHLRightRail } from 'src/app/models/hockey/nhl/nhl-right-rail';
import { NHLLanding } from 'src/app/models/hockey/nhl/nhl-landing';
import { NHLGameData } from 'src/app/models/hockey/nhl/nhl-game-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NhlService {
  // urlToFetch: string =
  // 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard';
  //https://api-web.nhle.com/v1/score/2024-10-05
  // https://api-web.nhle.com/v1/gamecenter/2024020002/landing
  // https://api-web.nhle.com/v1/gamecenter/2024020002/right-rail
  // https://api-web.nhle.com/v1/gamecenter/2024020002/boxscore
  // https://api-web.nhle.com/v1/gamecenter/2024020002/play-by-play
  scoreboardUrl: string = 'https://api-web.nhle.com/v1/score/';
  gamecenterUrl: string = 'https://api-web.nhle.com/v1/gamecenter/';
  // leagueToFetch: string | undefined;

  constructor(private http: HttpClient) {}

  getGameData(dateToFetch: string): Observable<NHLGameData> {
    //Will return data asynchronously
    return this.http.get<NHLGameData>(`${this.scoreboardUrl}${dateToFetch}`);
  }

  getGameLanding(gameId: string): Observable<NHLLanding> {
    return this.http.get<NHLLanding>(
      `${this.gamecenterUrl}${gameId}/landing`
    );
  }

  getGameRightRail(gameID: string): Observable<NHLRightRail> {
    return this.http.get<NHLRightRail>(
      `${this.gamecenterUrl}${gameID}/right-rail`
    );
  }

  getGameBoxscore(gameId: string): Observable<NHLBoxscore> {
    return this.http.get<NHLBoxscore>(`${this.gamecenterUrl}${gameId}/boxscore`);
  }

  getGamePlayByPlay(gameId: string): Observable<NHLPlayByPlay> {
    return this.http.get<NHLPlayByPlay>(`${this.gamecenterUrl}${gameId}/play-by-play`);
  }
}
