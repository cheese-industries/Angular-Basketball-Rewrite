import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CflGameData } from './models/cfl-game-data';
import { CflWeekObject } from './models/cfl-week-object';

@Injectable({
  providedIn: 'root'
})
export class CflService {
  constructor(private http: HttpClient) { }

  getDefaultWeek(): Observable<CflWeekObject> {
    return this.http.get<CflWeekObject>(
      `https://danl.ee:3000/fetch/http://datacrunch.9c9media.ca/statsapi/sports/football/leagues/cfl/calendar?brand=tsn&type=json`
    );
  }

  getCflData(weekNumber: number): Observable<CflGameData> {
    return this.http.get<CflWeekObject>(
      `https://danl.ee:3000/fetch/http://datacrunch.9c9media.ca/statsapi/sports/football/leagues/cfl/schedule/subset/dates?brand=tsn&type=json&dateOrId=${weekNumber}&toAdd=0&resultsPage=true`
    );
  } 

}

// FIGURES OUT WHICH WEEK OF THE SEASON THIS IS
// https://datacrunch.9c9media.ca/statsapi/sports/football/leagues/cfl/calendar?brand=tsn&type=json

// GETS SCORES BY WEEK - SET WEEK NUMBER IN "DATE OR ID"
//https://datacrunch.9c9media.ca/statsapi/sports/football/leagues/cfl/schedule/subset/dates?brand=tsn&type=json&dateOrId=1&toAdd=0&resultsPage=true