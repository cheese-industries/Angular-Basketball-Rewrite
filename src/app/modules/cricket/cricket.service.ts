import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from '../../models/cricket/game-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CricketService {
  urlToFetch: string =
    'https://hidden-anchorage-20030.herokuapp.com/https://hs-consumer-api.espncricinfo.com/v1/pages/matches/current?lang=en&latest=true';
  //    'https://hidden-anchorage-20030.herokuapp.com/https://www.echl.com/api/s3/live?q=live-events.json';

  constructor(private http: HttpClient) {}

  getGameData(): Observable<GameData> {
    return this.http.get<GameData>(`${this.urlToFetch}`);
  }
}
