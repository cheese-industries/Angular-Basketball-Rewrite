import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtpApiReturn } from './models/atp-api-return';
import { TennisScheduleRoot } from './models/tennis-schedule-root';

@Injectable({
  providedIn: 'root',
})
export class AtpService {
  constructor(private http: HttpClient) {}

  getScheduleObject(): Observable<TennisScheduleRoot> {
    return this.http.get<TennisScheduleRoot>(
      `https://danl.ee:3000/fetch/http://mobile-statsv2.sportsnet.ca/tournaments?league=atp`
    );
  }

  getIndividualEvent(id: number): Observable<AtpApiReturn> {
    return this.http.get<AtpApiReturn>(
      `https://danl.ee:3000/fetch/http://mobile-statsv2.sportsnet.ca/events?league=atp&id=${id}`
    );
  }
}

// SCHEDULE ENDPOINT
// https://mobile-statsv2.sportsnet.ca/tournaments?league=atp

// INDIVIDUAL EVENT ENDPOINT
// https://mobile-statsv2.sportsnet.ca/events?league=atp&id=2411132
