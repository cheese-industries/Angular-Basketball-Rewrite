import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AFLDataReturn } from './models/afl-data-return';

@Injectable({
  providedIn: 'root',
})
export class AflService {
  yearToFetch?: number;
  roundToFetch?: number;
  seasonTypeToFetch?: number;

  constructor(private http: HttpClient) {}

  getDefaultAflData(): Observable<AFLDataReturn> {
    return this.http.get<AFLDataReturn>(
      `https://secure.espn.com/core/afl/scoreboard?xhr=1`
      // `https://secure.espn.com/afl/scoreboard/_/year/2018/seasontype/2/week/11?xhr=1`
    );
  }

  getUserDefinedAflData(year: number, round: number, seasonType: number): Observable<AFLDataReturn> {
    return this.http.get<AFLDataReturn>(
      // `https://secure.espn.com/core/afl/scoreboard?xhr=1`
      `https://secure.espn.com/afl/scoreboard/_/year/${year}/seasontype/${seasonType}/week/${round}?xhr=1`
    );
  }

  getAflCalendar(year: number): Observable<AFLDataReturn> {
    return this.http.get<AFLDataReturn>(
      // `https://secure.espn.com/core/afl/scoreboard?xhr=1`
      `https://secure.espn.com/afl/scoreboard/_/year/${this.yearToFetch}/seasontype/2/week/1?xhr=1`
    );
  }
}
