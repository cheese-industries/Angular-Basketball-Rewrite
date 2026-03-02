// NOTE: Replaced older bdfed stitch endpoints with statsapi schedule.
// Using schedule endpoint per MLB guidance.
// Hydrate pattern provided by MLB example. Adjust if needed.
//
// Example hydrate used below:
// hydrate=statusFlags,team(leaders(showOnPreview(leaderCategories=[homeRuns,runsBattedIn,battingAverage],statGroup=[pitching,hitting]))),linescore(matchup,runners),flags,review,broadcasts(all),venue(location),decisions,person,probablePitcher,stats,homeRuns,summary),tickets),seriesStatus(useOverride=true)

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mlbApiReturn } from './models/mlb-api-models/mlb-api-return';
import { BaseballPBP } from './models/baseball-pbp/baseball-pbp';
import { RootObject } from './models/boxscore/root-object';
import { WinProb } from './models/baseball-pbp/win-prob';
import { StandingsRootObject } from './models/mlb-api-models/standings';

@Injectable({
  providedIn: 'root',
})
export class NorthAmericaService {
  urlToFetch: string = '';
  headers = new Headers();

  constructor(private http: HttpClient) {}

  private buildScheduleUrl(
    sportId: string,
    year: string,
    month: string,
    day: string,
    extraParams: string = ''
  ): string {
    return `https://statsapi.mlb.com/api/v1/schedule?startDate=${year}-${month}-${day}&endDate=${year}-${month}-${day}&sportId=${sportId}&hydrate=statusFlags,team(sport,leaders(showOnPreview(leaderCategories=[homeRuns,runsBattedIn,battingAverage],statGroup=[pitching,hitting]))),linescore(matchup,runners),flags,review,broadcasts(all),venue(location),decisions,person,probablePitcher,stats,homeRuns,summary,tickets,seriesStatus(useOverride=true)&timeZone=America/New_York${extraParams}`;
  }

  getMlbData(year: string, month: string, day: string): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(
        '1',
        year,
        month,
        day,
        '&gameType=E&gameType=S&gameType=R&gameType=F&gameType=D&gameType=L&gameType=W&gameType=A&leagueId=104&leagueId=103'
      )
    );
  }

  getAaaData(year: string, month: string, day: string): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(
        '11',
        year,
        month,
        day,
        '&gameType=E&gameType=S&gameType=R&gameType=F&gameType=D&gameType=L&gameType=W&gameType=A&leagueId=117&leagueId=112'
      )
    );
  }

  getAaData(year: string, month: string, day: string): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(
        '12',
        year,
        month,
        day,
        '&gameType=E&gameType=S&gameType=R&gameType=F&gameType=D&gameType=L&gameType=W&gameType=A&leagueId=109&leagueId=113&leagueId=111'
      )
    );
  }

  getHighAData(year: string, month: string, day: string): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(
        '13',
        year,
        month,
        day,
        '&gameType=E&gameType=S&gameType=R&gameType=F&gameType=D&gameType=L&gameType=W&gameType=A&leagueId=118&leagueId=116&leagueId=126'
      )
    );
  }

  getLowAData(year: string, month: string, day: string): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(
        '14',
        year,
        month,
        day,
        '&gameType=E&gameType=S&gameType=R&gameType=F&gameType=D&gameType=L&gameType=W&gameType=A&leagueId=122&leagueId=123&leagueId=110'
      )
    );
  }

  getEveryGameOnEveryLevel(
    year: string,
    month: string,
    day: string,
    levels: string
  ): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(levels, year, month, day)
    );
  }

  getLiveScoresNow(
    year: string,
    month: string,
    day: string
  ): Observable<mlbApiReturn> {
    return this.http.get<mlbApiReturn>(
      this.buildScheduleUrl(
        '1,11,12,13,14,16',
        year,
        month,
        day,
        '&gameType=R&gameType=F&gameType=D&gameType=L&gameType=W&gameType=A&gameType=C'
      )
    );
  }

  getPBPData(gameId: string | number): Observable<WinProb[]> {
    return this.http.get<WinProb[]>(
      `https://statsapi.mlb.com/api/v1/game/${gameId}/winProbability`
    );
  }

  getBoxscore(gameId: number): Observable<RootObject> {
    return this.http.get<RootObject>(
      `https://statsapi.mlb.com/api/v1/game/${gameId}/boxscore`
    );
  }

  getStandings(year: string, leagues: string): Observable<StandingsRootObject> {
    return this.http.get<StandingsRootObject>(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=${leagues}&season=${year}&standingsTypes=regularSeason,firstHalf,secondHalf&hydrate=division,conference,sport,league,team(nextSchedule(team,gameType=[R,F,D,L,W,C],inclusive=false),previousSchedule(team,gameType=[R,F,D,L,W,C],inclusive=true))`
    );
  }

  getHourlyForecastForVenue(
    latitude: number,
    longitude: number,
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.http.get<any>(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=UTC&start_date=${startDate}&end_date=${endDate}`
    );
  }
}