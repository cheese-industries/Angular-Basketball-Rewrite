import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { HttpClient} from '@angular/common/http';
import { NcaaGameData } from 'src/app/models/ncaa-game-data';


@Injectable({
  providedIn: 'root',
})
export class NcaahService {
  urlToFetch: string =
    'https://hidden-anchorage-20030.herokuapp.com/https://data.ncaa.com/casablanca/scoreboard/icehockey-men/d1/';
  leagueToFetch: string | undefined;

  constructor(private http: HttpClient) {}

  getGameData(dateToFetch: string): Observable<NcaaGameData> {
    //REST request to ESPN
    //Will return that data asynchronously

    // GAME WITH A DEFINED DATE TO FETCH
    try {
    return this.http.get<NcaaGameData>(
      `${this.urlToFetch}${dateToFetch}/scoreboard.json`
//         `${this.urlToFetch}2021/12/04/scoreboard.json`
    ) }
    catch (e) {
      return new Observable(undefined)
    }

  
}
}
