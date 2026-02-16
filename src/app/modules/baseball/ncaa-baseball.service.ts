import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { NcaaBaseballApiReturn } from './models/ncaa-baseball/ncaa-baseball-root';

@Injectable({
  providedIn: 'root'
})
export class NcaaBaseballService {
  urlToFetch: string =
  'https://data.ncaa.com/casablanca/scoreboard/baseball/d1/';


  constructor(private http: HttpClient) {}

  getGameData(dateToFetch: string): Observable<NcaaBaseballApiReturn> {
    //REST request to ESPN
    //Will return that data asynchronously

    // GAME WITH A DEFINED DATE TO FETCH
    try {
    return this.http.get<NcaaBaseballApiReturn>(
      `${this.urlToFetch}${dateToFetch}/scoreboard.json`
//         `${this.urlToFetch}2021/12/04/scoreboard.json`
    ) }
    catch (e) {
      return new Observable(undefined)
    }

  
}
}