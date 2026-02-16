import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mlbApiReturn } from './models/mlb-api-models/mlb-api-return';
import { BaseballPBP } from './models/baseball-pbp/baseball-pbp';
import { RootObject } from './models/boxscore/root-object';
import { WinProb } from './models/baseball-pbp/win-prob';
import { StandingsRootObject } from './models/mlb-api-models/standings';
import { WeatherAPIReturn } from 'src/app/models/weather-api-return';
import { ZipCodeDocument } from 'src/app/models/zip-code-document';

@Injectable({
  providedIn: 'root',
})
export class NorthAmericaService {
  urlToFetch: string = '';
  headers = new Headers();
  constructor(private http: HttpClient) {}

  getMlbData(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      // `https://danl.ee:3000/fetch/http://gd2.mlb.com/components/game/mlb/year_${yearToFetch}/month_${monthToFetch}/day_${dayToFetch}/master_scoreboard.json`
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
      // `https://danl.ee:3000/fetch/http://gd2.mlb.com/components/game/aaa/year_${yearToFetch}/month_${monthToFetch}/day_${dayToFetch}/master_scoreboard.json`
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
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=12&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=109&&leagueId=113&&leagueId=111&contextTeamId=`
    );
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
  // getRookieData(
  //   yearToFetch: string,
  //   monthToFetch: string,
  //   dayToFetch: string
  // ): Observable<mlbApiReturn> {
  //   //REST request to MLB
  //   //Will return that data asynchronously
  //   return this.http.get<mlbApiReturn>(
  //     `https://danl.ee:3000/fetch/https://gd2.mlb.com/components/game/rok/year_${yearToFetch}/month_${monthToFetch}/day_${dayToFetch}/master_scoreboard.json`
  //   );
  // }

  getPBPData(gameToFetch: string | number): Observable<WinProb[]> {
    // this.headers.append('X-Requested-With', 'XMLHttpRequest')
    return this.http.get<WinProb[]>(
      `https://statsapi.mlb.com/api/v1/game/${gameToFetch}/winProbability`
    );
  }

  getBoxscore(gameId: number): Observable<RootObject> {
    return this.http.get<RootObject>(
      `https://statsapi.mlb.com/api/v1/game/${gameId}/boxscore`
    );
  }

  getEveryGameOnEveryLevel(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string,
    levelsToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-milb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=${levelsToFetch}&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}`
      );
  }

  getLiveScoresNow(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string,
    levelsToFetch: string
  ): Observable<mlbApiReturn> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<mlbApiReturn>(
      `https://bdfed.stitch.mlbinfra.com/bdfed/transform-milb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=1&sportId=11&&sportId=12&&sportId=13&&sportId=14&&sportId=16&startDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&endDate=${yearToFetch}-${monthToFetch}-${dayToFetch}&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&&gameType=C`
      );
  }

  getStandings(yearToFetch: string, leaguesToFetch: string): Observable<StandingsRootObject>{
    return this.http.get<StandingsRootObject>(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=${leaguesToFetch}&season=${yearToFetch}&standingsTypes=regularSeason,firstHalf,secondHalf&hydrate=division,conference,sport,league,team(nextSchedule(team,gameType=[R,F,D,L,W,C],inclusive=false),previousSchedule(team,gameType=[R,F,D,L,W,C],inclusive=true))`
    );
  }

  getWeather(): Observable<any>{
    return this.http.get<any>(
      `https://danl.ee/weather/todayGameWeather.json`    )
  }

}
