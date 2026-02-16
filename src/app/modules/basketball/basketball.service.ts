import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BasketballService {
  urlToFetch: string =
    'https://site.api.espn.com/apis/site/v2/sports/basketball';
  leagueToFetch: string | undefined;
  urlSuffix: string | undefined;

  constructor(private http: HttpClient) {}

  getGameData(
    leagueToFetch: string,
    dateToFetch: string,
    isCollege: boolean
  ): Observable<GameData> {
    //REST request to ESPN
    //Will return that data asynchronously

    // GAME WITH A DEFINED DATE TO FETCH
    if (dateToFetch) {
      return this.http.get<GameData>(
        `${this.urlToFetch}/${leagueToFetch}/scoreboard?dates=${dateToFetch}${this.urlSuffix}`
      );
    }
    // GAME WITHOUT A DEFINED DATE TO FETCH, DEFAULTS TO TODAY'S DATE
    else {
      return this.http.get<GameData>(
        `${this.urlToFetch}/${leagueToFetch}/scoreboard?${this.urlSuffix}`
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
