import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from '../models/game-data';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  getData(): Observable<GameData> {
    //REST request to ESPN
    //Will return that data asynchronously
  let returnedData = this.http.get<GameData>('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
  return returnedData;
  }
}
