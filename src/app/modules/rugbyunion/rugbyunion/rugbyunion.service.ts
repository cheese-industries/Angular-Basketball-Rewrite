import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RugbyData } from '../models/rugby-data';

@Injectable({
  providedIn: 'root',
})
export class RugbyunionService {
  todayGamesUrl: string = 'http://192.227.229.235:3000/fetch/https://supersport.com/api/rugby/v4/feed/today';
  futureGamesUrl: string =
    'http://192.227.229.235:3000/fetch/https://supersport.com/api/rugby/v4/feed/score/summary?eventStatus=1&pageSize=25&orderAscending=true&region=za';
  pastGamesUrl: string =
    'http://192.227.229.235:3000/fetch/https://supersport.com/api/rugby/v4/feed/score/summary?eventStatus=3&pageSize=25&orderAscending=false&region=za';

  constructor(private http: HttpClient) {}
  
  getPastGamesData(): Observable<RugbyData> {
    return this.http.get<RugbyData>(this.pastGamesUrl);
  }

  getTodayGamesData(): Observable<RugbyData> {
    return this.http.get<RugbyData>(this.todayGamesUrl);
  }

  getFutureGamesData(): Observable<RugbyData> {
    return this.http.get<RugbyData>(this.futureGamesUrl);
  }

}
