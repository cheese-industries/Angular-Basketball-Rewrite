import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { AhlData } from 'src/app/models/hockey/ahl/ahl-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AhlService {
  urlToFetch: string =
    'http://192.227.229.235:3000/fetch/https://datacrunch.9c9media.ca/statsapi/sports/hockey/leagues/ahl/schedule/subset/dates?dateOrId=';
  leagueToFetch: string | undefined;

  constructor(private http: HttpClient) {}

  getGameData(dateToFetch: string): Observable<AhlData> {
    //REST request
    //Will return that data asynchronously
console.log(`${this.urlToFetch}${dateToFetch}`)
    return this.http.get<AhlData>(`${this.urlToFetch}${dateToFetch}`);
  }

  getIndividualGame(
    leagueToFetch: string | undefined = this.leagueToFetch,
    gameId: string
  ): Observable<GameData> {
    return this.http.get<GameData>(
      `${this.urlToFetch}/${leagueToFetch}/scoreboard/${gameId}`
    );
    console.log(this.leagueToFetch);
  }
}
