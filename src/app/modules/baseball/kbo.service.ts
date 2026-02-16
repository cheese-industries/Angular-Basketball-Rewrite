import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KboService {

  constructor(private http: HttpClient) {}

  getKboData(date: number)
  {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get(
      // 'https://danl.ee:3000/fetch/http://eng.koreabaseball.com/Schedule/Scoreboard.aspx', {responseType: 'text'});}
      `https://www.koreabaseball.com/ws/Main.asmx/GetKboGameList?leId=1&srId=0&date=${date}`
    );
  }

  getGameData(seasonID: number, gameID: string) {
    return this.http.get(
      `http://www.koreabaseball.com/ws/Schedule.asmx/GetScoreBoardScroll?leId=1&srId=0&seasonId=${seasonID}&gameId=${gameID}`
    )
  }
}
