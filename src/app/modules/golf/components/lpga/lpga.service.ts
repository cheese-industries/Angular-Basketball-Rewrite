import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PgaData } from '../../models/pga-data';

@Injectable({
  providedIn: 'root',
})
export class LpgaService {
  urlToFetch: string =
    'https://site.web.api.espn.com/apis/site/v2/sports/golf/leaderboard?league=lpga';
  leagueToFetch: string | undefined;

  constructor(private http: HttpClient) {}

  getGameData(): Observable<PgaData> {
    //REST request
    //Will return that data asynchronously
    return this.http.get<PgaData>(`${this.urlToFetch}`);
  }
}
