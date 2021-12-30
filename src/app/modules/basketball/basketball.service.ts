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

  constructor(private http: HttpClient) {}

  getGameData(
    leagueToFetch: string,
    dateToFetch: string,
    isCollege: boolean
  ): Observable<GameData> {
    //REST request to ESPN
    //Will return that data asynchronously

    //Without a defined groups parameter in the URL for college games, the API only returns games involving the Top 25. "groups=50" displays every Division I game.
    //The "limit" parameter in college games tells the API to return every game, not just some subset.

    // PRO GAME WITH A DEFINED DATE TO FETCH
    if (dateToFetch && !isCollege) {
      return this.http.get<GameData>(
        `${this.urlToFetch}/${leagueToFetch}/scoreboard?dates=${dateToFetch}`
      );
    }
    // PRO GAME WITHOUT A DEFINED DATE TO FETCH, DEFAULTS TO TODAY'S DATE
    else if (!dateToFetch && !isCollege) {
      return this.http.get<GameData>(
        `${this.urlToFetch}/${leagueToFetch}/scoreboard`
      );
    }
    //COLLEGE GAME WITH A DEFINED DATE TO FETCH
    else if (dateToFetch && isCollege) {
      return this.http.get<GameData>(
        `${this.urlToFetch}/${leagueToFetch}/scoreboard?dates=${dateToFetch}&groups=50&limit=200`
      );
    }
    //IF NONE OF THE ABOVE APPLY, THE ONLY OPTION LEFT IS THAT IT'S A COLLEGE GAME WITH NO DEFINED DATE TO FETCH
    else {
      return this.http.get<GameData>(
        `${this.urlToFetch}/${leagueToFetch}/scoreboard?groups=50&limit=200`
      );
    }
  }

  getIndividualGame(
    leagueToFetch: string,
    gameId: string
  ): Observable<GameData> {
    return this.http.get<GameData>(
      `${this.urlToFetch}/${leagueToFetch}/scoreboard/${gameId}`
    );
  }
}
