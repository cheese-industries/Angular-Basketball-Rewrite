import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NrlApiReturn } from './nrl/models/nrl-api-return';

@Injectable({
  providedIn: 'root',
})
export class NrlService {
  constructor(private http: HttpClient) {}

  getDefaultNrlData(): Observable<NrlApiReturn> {
    return this.http.get<NrlApiReturn>(
      `https://danl.ee:3000/fetch/http://www.nrl.com/draw//data?competition=111`
      // `https://danl.ee:3000/fetch/http://www.nrl.com/draw//data?competition=111&round=3&season=2021`
    );
  }

  getUserDefinedNrlData(year: number, round: number): Observable<NrlApiReturn> {
    return this.http.get<NrlApiReturn>(
      // `https://danl.ee:3000/fetch/http://www.nrl.com/draw//data?competition=111`
      `https://danl.ee:3000/fetch/http://www.nrl.com/draw//data?competition=111&round=${round}&season=${year}`
    );
  }
}
