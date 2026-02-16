import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SoccerService {
  urlToFetch: string =
    'https://secure.espn.com/soccer/scoreboard/_/league/all';
  leagueToFetch: string | undefined;

  constructor(private http: HttpClient) {}

  getGameData(
    dateToFetch: string
  ): Observable<GameData> {
    //REST request to ESPN
    //Will return that data asynchronously

    // GAME WITH A DEFINED DATE TO FETCH
    if (dateToFetch) {
      return this.http.get<GameData>(
        `${this.urlToFetch}/date/${dateToFetch}?xhr=1`
      );
    }
    // GAME WITHOUT A DEFINED DATE TO FETCH, DEFAULTS TO TODAY'S DATE
    else {
      return this.http.get<GameData>(
        `${this.urlToFetch}?xhr=1`
      );
    }
  }

  getIndividualGame(
    leagueToFetch: string | undefined = this.leagueToFetch,
    gameId: string
  ): Observable<GameData> {
    return this.http.get<GameData>(
      `${this.urlToFetch}/${leagueToFetch}/scoreboard/${gameId}`
    );
    }
}
