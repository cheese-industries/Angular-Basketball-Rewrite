import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NflService {  urlToFetch: string =
  'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
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
      `${this.urlToFetch}?dates=${dateToFetch}`
    );
  }
  // GAME WITHOUT A DEFINED DATE TO FETCH, DEFAULTS TO TODAY'S DATE
  else {
    return this.http.get<GameData>(
      `${this.urlToFetch}`
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
