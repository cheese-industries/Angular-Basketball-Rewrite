import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CpblService {
  constructor(private http: HttpClient) {}

  getCpblData(currentDate: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://api-secure.sports.yahoo.com/v1/editorial/s/scoreboard?leagues=cpbl&date=${currentDate}`
      // `https://danl.ee:3000/fetch/http://api-secure.sports.yahoo.com/v1/editorial/s/scoreboard?leagues=cpbl&date=2022-01-02`
    );
  }

}
