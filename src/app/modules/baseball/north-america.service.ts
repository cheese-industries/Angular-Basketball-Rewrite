import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mlbApiReturn } from './models/mlb-api-models/mlb-api-return';

@Injectable({
  providedIn: 'root',
})
export class NorthAmericaService {
  urlToFetch: string = '';

  constructor(private http: HttpClient) {}

  getMlbData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      // `http://192.227.229.235:3000/fetch/http://gd2.mlb.com/components/game/mlb/year_${yearToFetch}/month_${monthToFetch}/day_${dayToFetch}/master_scoreboard.json`
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=1&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=104&&leagueId=103&contextTeamId=`
    );
  }

  getAaaData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      // `http://192.227.229.235:3000/fetch/http://gd2.mlb.com/components/game/aaa/year_${yearToFetch}/month_${monthToFetch}/day_${dayToFetch}/master_scoreboard.json`    
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=11&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=117&&leagueId=112&contextTeamId=`
      );
  }
  getAaData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=12&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=109&&leagueId=113&&leagueId=111&contextTeamId=`    );
  }
  getHighAData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=13&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=118&&leagueId=116&&leagueId=126&contextTeamId=`
    );
  }
  getLowAData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=14&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=122&&leagueId=123&&leagueId=110&contextTeamId=`
    );
  }
  getRookieData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      `http://192.227.229.235:3000/fetch/http://gd2.mlb.com/components/game/rok/year_${yearToFetch}/month_${monthToFetch}/day_${dayToFetch}/master_scoreboard.json`    );
  }

}
