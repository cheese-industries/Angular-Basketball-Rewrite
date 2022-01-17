import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { EchlData } from 'src/app/models/hockey/ahl/echl-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EchlService {
  urlToFetch: string =
    'https://hidden-anchorage-20030.herokuapp.com/https://www.echl.com/api/s3/live?q=live-events.json';


  constructor(private http: HttpClient) {}

  getGameData(): Observable<EchlData> {
    //REST request
    //Will return that data asynchronously
//console.log(`${this.urlToFetch}${dateToFetch}`)
    return this.http.get<EchlData>(`${this.urlToFetch}`);
  }

}
