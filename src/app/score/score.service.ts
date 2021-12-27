import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GameData } from '../models/game-data';

@Injectable({
  providedIn: 'root'
})

export class ScoreService {
  urlToFetch: string = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
  individualGameData: object = {};
  constructor(private http: HttpClient) { }

  getData(dateToFetch?: string | null): Observable<GameData> {
    //REST request to ESPN
    //Will return that data asynchronously
if(dateToFetch) {
  return this.http.get<GameData>(`${this.urlToFetch}?dates=${dateToFetch}`);
} else {
  return this.http.get<GameData>(this.urlToFetch);
}
  }

  getGame(gameId?: string | null): Observable<GameData> {
    return this.http.get<GameData>(`${this.urlToFetch}/${gameId}`);
  }


}
 