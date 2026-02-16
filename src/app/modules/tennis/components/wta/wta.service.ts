import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WtaApiReturn } from './models/wta-api-return';
import { TennisScheduleRoot } from './models/tennis-schedule-root';

@Injectable({
  providedIn: 'root',
})
export class WtaService {
  constructor(private http: HttpClient) {}

  getScheduleObject(): Observable<TennisScheduleRoot> {
    return this.http.get<TennisScheduleRoot>(
      `https://danl.ee:3000/fetch/http://mobile-statsv2.sportsnet.ca/tournaments?league=wta`
    );
  }

  getIndividualEvent(id: number): Observable<WtaApiReturn> {
    return this.http.get<WtaApiReturn>(
      `https://danl.ee:3000/fetch/http://mobile-statsv2.sportsnet.ca/events?league=wta&id=${id}`
    );
  }
}
