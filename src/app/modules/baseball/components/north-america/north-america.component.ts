import { Component, OnInit } from '@angular/core';
import { NorthAmericaService } from '../../north-america.service';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mlbApiReturn } from '../../models/mlb-api-models/mlb-api-return';

@Component({
  selector: 'app-north-america',
  templateUrl: './north-america.component.html',
  styleUrls: ['./north-america.component.css'],
})
export class NorthAmericaComponent implements OnInit {
  todaysDate!: Date;
  todaysDateArray!: any[];
  baseballDataArray!: any[];
  mlbData?: mlbApiReturn;
  aaaData?: mlbApiReturn;
  aaData?: mlbApiReturn;
  lowAData?: mlbApiReturn;
  highAData?: mlbApiReturn;
  rookieData?: mlbApiReturn;
  yearNum!: number;
  monthNumBeforeSlice!: string;
  monthNum!: string;
  dayNum!: number;
  defaultDate!: string;
  form: FormGroup;
  data!: mlbApiReturn;

  constructor(private service: NorthAmericaService) {
    this.form = new FormGroup({
      dateToCall: new FormControl(this.setTodayDate(), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.setTodayDate();
    this.getTheScores(
      this.todaysDateArray[0],
      this.todaysDateArray[1],
      this.todaysDateArray[2]
    );
  }

  setTodayDate() {
    this.todaysDate = new Date();
    this.todaysDateArray = [, ,];
    this.todaysDateArray[0] = this.todaysDate.getFullYear().toString();
    this.todaysDateArray[1] = this.todaysDate.getMonth() + 1;
    this.todaysDateArray[2] = this.todaysDate.getDate().toString();
    if (this.todaysDateArray[1] < 10) {
      this.todaysDateArray[1] = '0' + this.todaysDateArray[1];
    }
    this.todaysDateArray[1] = this.todaysDateArray[1].toString();
  }

  getTheMlbScores(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ) {
    const subscription = this.service
      .getMlbData(yearToFetch, monthToFetch, dayToFetch)
      .subscribe((response) => {
        this.mlbData = response;
        this.makeTheMLBHomeRunObjects();
        this.makeTheMLBBroadcastDivs();
        this.calculateMLBSlg();
        console.log('mlb ', response);
        subscription.unsubscribe();
      });
  }

  getTheAaaScores(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ) {
    const subscription = this.service
      .getAaaData(yearToFetch, monthToFetch, dayToFetch)
      .subscribe((response) => {
        this.aaaData = response;
        this.makeTheAAAHomeRunObjects();
        this.makeTheAAABroadcastDivs();
        this.calculateAAASlg();
        console.log('aaa ', response);
        subscription.unsubscribe();
      });
  }

  getTheAaScores(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ) {
    const subscription = this.service
      .getAaData(yearToFetch, monthToFetch, dayToFetch)
      .subscribe((response) => {
        this.aaData = response;
        this.makeTheAAHomeRunObjects();
        this.makeTheAABroadcastDivs();
        this.calculateAASlg();
        console.log('aa ', response);
        subscription.unsubscribe();
      });
  }

  getTheHighAScores(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ) {
    const subscription = this.service
      .getHighAData(yearToFetch, monthToFetch, dayToFetch)
      .subscribe((response) => {
        this.highAData = response;
        this.makeTheHighAHomeRunObjects();
        this.makeTheHighABroadcastDivs();
        this.calculateHighASlg();
        console.log('high a ', response);
        subscription.unsubscribe();
      });
  }

  getTheLowAScores(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ) {
    const subscription = this.service
      .getLowAData(yearToFetch, monthToFetch, dayToFetch)
      .subscribe((response) => {
        this.lowAData = response;
        this.makeTheLowAHomeRunObjects();
        this.makeTheLowABroadcastDivs();
        this.calculateLowASlg();
        console.log('low a ', response);
        subscription.unsubscribe();
      });
  }

  getTheRookieScores(
    yearToFetch: string,
    monthToFetch: string,
    dayToFetch: string
  ) {
    const subscription = this.service
      .getRookieData(yearToFetch, monthToFetch, dayToFetch)
      .subscribe((response) => {
        this.rookieData = response;
        console.log('rookie league ', response);
        subscription.unsubscribe();
      });
  }

  getTheScores(yearToFetch: string, monthToFetch: string, dayToFetch: string) {
    this.getTheMlbScores(yearToFetch, monthToFetch, dayToFetch);
    this.getTheAaaScores(yearToFetch, monthToFetch, dayToFetch);
    this.getTheAaScores(yearToFetch, monthToFetch, dayToFetch);
    this.getTheHighAScores(yearToFetch, monthToFetch, dayToFetch);
    this.getTheLowAScores(yearToFetch, monthToFetch, dayToFetch);
    // this.getTheRookieScores(yearToFetch, monthToFetch, dayToFetch);
  }

  makeTheMLBBroadcastDivs() {
    if (this.mlbData) {
      for (var i = 0; i < this.mlbData.dates[0].games.length; i++) {
        this.mlbData.dates[0].games[i].homeTVArray = [];
        this.mlbData.dates[0].games[i].awayTVArray = [];
        this.mlbData.dates[0].games[i].awayTVDiv = '';
        this.mlbData.dates[0].games[i].homeTVDiv = '';
        if (this.mlbData.dates[0].games[i].broadcasts) {
          for (
            var j = 0;
            j < this.mlbData.dates[0].games[i].broadcasts.length;
            j++
          ) {
            if (
              this.mlbData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.mlbData.dates[0].games[i].broadcasts[j].homeAway == 'home'
            ) {
              this.mlbData.dates[0].games[i].homeTVArray.push(
                this.mlbData.dates[0].games[i].broadcasts[j].name
              );
            }
            if (
              this.mlbData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.mlbData.dates[0].games[i].broadcasts[j].homeAway == 'away'
            ) {
              this.mlbData.dates[0].games[i].awayTVArray.push(
                this.mlbData.dates[0].games[i].broadcasts[j].name
              );
            }
          }
          if (this.mlbData.dates[0].games[i].awayTVArray.length > 0) {
            this.mlbData.dates[0].games[i].awayTVDiv =
              this.mlbData.dates[0].games[i].teams.away.team.abbreviation +
              ' TV: ';
          }
          if (this.mlbData.dates[0].games[i].homeTVArray.length > 0) {
            this.mlbData.dates[0].games[i].homeTVDiv =
              this.mlbData.dates[0].games[i].teams.home.team.abbreviation +
              ' TV: ';
          }
          for (
            var k = 0;
            k < this.mlbData.dates[0].games[i].awayTVArray.length;
            k++
          ) {
            this.mlbData.dates[0].games[i].awayTVDiv +=
              this.mlbData.dates[0].games[i].awayTVArray[k] + ', ';
          }
          for (
            var m = 0;
            m < this.mlbData.dates[0].games[i].homeTVArray.length;
            m++
          ) {
            this.mlbData.dates[0].games[i].homeTVDiv +=
              this.mlbData.dates[0].games[i].homeTVArray[m] + ', ';
          }
          this.mlbData.dates[0].games[i].homeTVDiv =
            this.mlbData.dates[0].games[i].homeTVDiv.substring(
              0,
              this.mlbData.dates[0].games[i].homeTVDiv.length - 2
            );
          this.mlbData.dates[0].games[i].awayTVDiv =
            this.mlbData.dates[0].games[i].awayTVDiv.substring(
              0,
              this.mlbData.dates[0].games[i].awayTVDiv.length - 2
            );
        }
      }
    }
  }

  makeTheAAABroadcastDivs() {
    if (this.aaaData) {
      for (var i = 0; i < this.aaaData.dates[0].games.length; i++) {
        this.aaaData.dates[0].games[i].homeTVArray = [];
        this.aaaData.dates[0].games[i].awayTVArray = [];
        this.aaaData.dates[0].games[i].awayTVDiv = '';
        this.aaaData.dates[0].games[i].homeTVDiv = '';
        if (this.aaaData.dates[0].games[i].broadcasts) {
          for (
            var j = 0;
            j < this.aaaData.dates[0].games[i].broadcasts.length;
            j++
          ) {
            if (
              this.aaaData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.aaaData.dates[0].games[i].broadcasts[j].homeAway == 'home'
            ) {
              this.aaaData.dates[0].games[i].homeTVArray.push(
                this.aaaData.dates[0].games[i].broadcasts[j].name
              );
            }
            if (
              this.aaaData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.aaaData.dates[0].games[i].broadcasts[j].homeAway == 'away'
            ) {
              this.aaaData.dates[0].games[i].awayTVArray.push(
                this.aaaData.dates[0].games[i].broadcasts[j].name
              );
            }
          }
          if (this.aaaData.dates[0].games[i].awayTVArray.length > 0) {
            this.aaaData.dates[0].games[i].awayTVDiv =
              this.aaaData.dates[0].games[i].teams.away.team.abbreviation +
              ' TV: ';
          }
          if (this.aaaData.dates[0].games[i].homeTVArray.length > 0) {
            this.aaaData.dates[0].games[i].homeTVDiv =
              this.aaaData.dates[0].games[i].teams.home.team.abbreviation +
              ' TV: ';
          }
          for (
            var k = 0;
            k < this.aaaData.dates[0].games[i].awayTVArray.length;
            k++
          ) {
            this.aaaData.dates[0].games[i].awayTVDiv +=
              this.aaaData.dates[0].games[i].awayTVArray[k] + ', ';
          }
          for (
            var m = 0;
            m < this.aaaData.dates[0].games[i].homeTVArray.length;
            m++
          ) {
            this.aaaData.dates[0].games[i].homeTVDiv +=
              this.aaaData.dates[0].games[i].homeTVArray[m] + ', ';
          }
          this.aaaData.dates[0].games[i].homeTVDiv =
            this.aaaData.dates[0].games[i].homeTVDiv.substring(
              0,
              this.aaaData.dates[0].games[i].homeTVDiv.length - 2
            );
          this.aaaData.dates[0].games[i].awayTVDiv =
            this.aaaData.dates[0].games[i].awayTVDiv.substring(
              0,
              this.aaaData.dates[0].games[i].awayTVDiv.length - 2
            );
        }
      }
    }
  }

  makeTheAABroadcastDivs() {
    if (this.aaData) {
      for (var i = 0; i < this.aaData.dates[0].games.length; i++) {
        this.aaData.dates[0].games[i].homeTVArray = [];
        this.aaData.dates[0].games[i].awayTVArray = [];
        this.aaData.dates[0].games[i].awayTVDiv = '';
        this.aaData.dates[0].games[i].homeTVDiv = '';
        if (this.aaData.dates[0].games[i].broadcasts) {
          for (
            var j = 0;
            j < this.aaData.dates[0].games[i].broadcasts.length;
            j++
          ) {
            if (
              this.aaData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.aaData.dates[0].games[i].broadcasts[j].homeAway == 'home'
            ) {
              this.aaData.dates[0].games[i].homeTVArray.push(
                this.aaData.dates[0].games[i].broadcasts[j].name
              );
            }
            if (
              this.aaData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.aaData.dates[0].games[i].broadcasts[j].homeAway == 'away'
            ) {
              this.aaData.dates[0].games[i].awayTVArray.push(
                this.aaData.dates[0].games[i].broadcasts[j].name
              );
            }
          }
          if (this.aaData.dates[0].games[i].awayTVArray.length > 0) {
            this.aaData.dates[0].games[i].awayTVDiv =
              this.aaData.dates[0].games[i].teams.away.team.abbreviation +
              ' TV: ';
          }
          if (this.aaData.dates[0].games[i].homeTVArray.length > 0) {
            this.aaData.dates[0].games[i].homeTVDiv =
              this.aaData.dates[0].games[i].teams.home.team.abbreviation +
              ' TV: ';
          }
          for (
            var k = 0;
            k < this.aaData.dates[0].games[i].awayTVArray.length;
            k++
          ) {
            this.aaData.dates[0].games[i].awayTVDiv +=
              this.aaData.dates[0].games[i].awayTVArray[k] + ', ';
          }
          for (
            var m = 0;
            m < this.aaData.dates[0].games[i].homeTVArray.length;
            m++
          ) {
            this.aaData.dates[0].games[i].homeTVDiv +=
              this.aaData.dates[0].games[i].homeTVArray[m] + ', ';
          }
          this.aaData.dates[0].games[i].homeTVDiv = this.aaData.dates[0].games[
            i
          ].homeTVDiv.substring(
            0,
            this.aaData.dates[0].games[i].homeTVDiv.length - 2
          );
          this.aaData.dates[0].games[i].awayTVDiv = this.aaData.dates[0].games[
            i
          ].awayTVDiv.substring(
            0,
            this.aaData.dates[0].games[i].awayTVDiv.length - 2
          );
        }
      }
    }
  }

  makeTheHighABroadcastDivs() {
    if (this.highAData) {
      for (var i = 0; i < this.highAData.dates[0].games.length; i++) {
        this.highAData.dates[0].games[i].homeTVArray = [];
        this.highAData.dates[0].games[i].awayTVArray = [];
        this.highAData.dates[0].games[i].awayTVDiv = '';
        this.highAData.dates[0].games[i].homeTVDiv = '';
        if (this.highAData.dates[0].games[i].broadcasts) {
          for (
            var j = 0;
            j < this.highAData.dates[0].games[i].broadcasts.length;
            j++
          ) {
            if (
              this.highAData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.highAData.dates[0].games[i].broadcasts[j].homeAway == 'home'
            ) {
              this.highAData.dates[0].games[i].homeTVArray.push(
                this.highAData.dates[0].games[i].broadcasts[j].name
              );
            }
            if (
              this.highAData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.highAData.dates[0].games[i].broadcasts[j].homeAway == 'away'
            ) {
              this.highAData.dates[0].games[i].awayTVArray.push(
                this.highAData.dates[0].games[i].broadcasts[j].name
              );
            }
          }
          if (this.highAData.dates[0].games[i].awayTVArray.length > 0) {
            this.highAData.dates[0].games[i].awayTVDiv =
              this.highAData.dates[0].games[i].teams.away.team.abbreviation +
              ' TV: ';
          }
          if (this.highAData.dates[0].games[i].homeTVArray.length > 0) {
            this.highAData.dates[0].games[i].homeTVDiv =
              this.highAData.dates[0].games[i].teams.home.team.abbreviation +
              ' TV: ';
          }
          for (
            var k = 0;
            k < this.highAData.dates[0].games[i].awayTVArray.length;
            k++
          ) {
            this.highAData.dates[0].games[i].awayTVDiv +=
              this.highAData.dates[0].games[i].awayTVArray[k] + ', ';
          }
          for (
            var m = 0;
            m < this.highAData.dates[0].games[i].homeTVArray.length;
            m++
          ) {
            this.highAData.dates[0].games[i].homeTVDiv +=
              this.highAData.dates[0].games[i].homeTVArray[m] + ', ';
          }
          this.highAData.dates[0].games[i].homeTVDiv =
            this.highAData.dates[0].games[i].homeTVDiv.substring(
              0,
              this.highAData.dates[0].games[i].homeTVDiv.length - 2
            );
          this.highAData.dates[0].games[i].awayTVDiv =
            this.highAData.dates[0].games[i].awayTVDiv.substring(
              0,
              this.highAData.dates[0].games[i].awayTVDiv.length - 2
            );
        }
      }
    }
  }

  makeTheLowABroadcastDivs() {
    if (this.lowAData) {
      for (var i = 0; i < this.lowAData.dates[0].games.length; i++) {
        this.lowAData.dates[0].games[i].homeTVArray = [];
        this.lowAData.dates[0].games[i].awayTVArray = [];
        this.lowAData.dates[0].games[i].awayTVDiv = '';
        this.lowAData.dates[0].games[i].homeTVDiv = '';
        if (this.lowAData.dates[0].games[i].broadcasts) {
          for (
            var j = 0;
            j < this.lowAData.dates[0].games[i].broadcasts.length;
            j++
          ) {
            if (
              this.lowAData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.lowAData.dates[0].games[i].broadcasts[j].homeAway == 'home'
            ) {
              this.lowAData.dates[0].games[i].homeTVArray.push(
                this.lowAData.dates[0].games[i].broadcasts[j].name
              );
            }
            if (
              this.lowAData.dates[0].games[i].broadcasts[j].type == 'TV' &&
              this.lowAData.dates[0].games[i].broadcasts[j].homeAway == 'away'
            ) {
              this.lowAData.dates[0].games[i].awayTVArray.push(
                this.lowAData.dates[0].games[i].broadcasts[j].name
              );
            }
          }
          if (this.lowAData.dates[0].games[i].awayTVArray.length > 0) {
            this.lowAData.dates[0].games[i].awayTVDiv =
              this.lowAData.dates[0].games[i].teams.away.team.abbreviation +
              ' TV: ';
          }
          if (this.lowAData.dates[0].games[i].homeTVArray.length > 0) {
            this.lowAData.dates[0].games[i].homeTVDiv =
              this.lowAData.dates[0].games[i].teams.home.team.abbreviation +
              ' TV: ';
          }
          for (
            var k = 0;
            k < this.lowAData.dates[0].games[i].awayTVArray.length;
            k++
          ) {
            this.lowAData.dates[0].games[i].awayTVDiv +=
              this.lowAData.dates[0].games[i].awayTVArray[k] + ', ';
          }
          for (
            var m = 0;
            m < this.lowAData.dates[0].games[i].homeTVArray.length;
            m++
          ) {
            this.lowAData.dates[0].games[i].homeTVDiv +=
              this.lowAData.dates[0].games[i].homeTVArray[m] + ', ';
          }
          this.lowAData.dates[0].games[i].homeTVDiv =
            this.lowAData.dates[0].games[i].homeTVDiv.substring(
              0,
              this.lowAData.dates[0].games[i].homeTVDiv.length - 2
            );
          this.lowAData.dates[0].games[i].awayTVDiv =
            this.lowAData.dates[0].games[i].awayTVDiv.substring(
              0,
              this.lowAData.dates[0].games[i].awayTVDiv.length - 2
            );
        }
      }
    }
  }

  calculateMLBSlg() {
    if (this.mlbData) {
      for (var i = 0; i < this.mlbData.dates[0].games.length; i++) {
        let batter = this.mlbData.dates[0].games[i].linescore.offense.batter;
        let onDeck = this.mlbData.dates[0].games[i].linescore.offense.onDeck;
        let inHole = this.mlbData.dates[0].games[i].linescore.offense.inHole;
        if (batter) {
          if (batter.stats[2].stats.atBats == 0) {
            batter.stats[2].stats.slg = '.000';
          }
          if (batter.stats[2].stats.atBats > 0) {
            batter.stats[2].stats.slg = (
              (batter.stats[2].stats.hits +
                batter.stats[2].stats.doubles +
                2 * batter.stats[2].stats.triples +
                3 * batter.stats[2].stats.homeRuns) /
              batter.stats[2].stats.atBats
            ).toFixed(3);
            if (batter.stats[2].stats.slg[0] == '0') {
              batter.stats[2].stats.slg =
                batter.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (onDeck) {
          if (+onDeck.stats[2].stats.atBats == 0) {
            onDeck.stats[2].stats.slg = '.000';
          }
          if (+onDeck.stats[2].stats.atBats > 0) {
            onDeck.stats[2].stats.slg = (
              (onDeck.stats[2].stats.hits +
                onDeck.stats[2].stats.doubles +
                2 * onDeck.stats[2].stats.triples +
                3 * onDeck.stats[2].stats.homeRuns) /
              onDeck.stats[2].stats.atBats
            ).toFixed(3);
            if (onDeck.stats[2].stats.slg[0] == '0') {
              onDeck.stats[2].stats.slg =
                onDeck.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (inHole) {
          if (+inHole.stats[2].stats.atBats == 0) {
            inHole.stats[2].stats.slg = '.000';
          }
          if (+inHole.stats[2].stats.atBats > 0) {
            inHole.stats[2].stats.slg = (
              (inHole.stats[2].stats.hits +
                inHole.stats[2].stats.doubles +
                2 * inHole.stats[2].stats.triples +
                3 * inHole.stats[2].stats.homeRuns) /
              inHole.stats[2].stats.atBats
            ).toFixed(3);
            if (inHole.stats[2].stats.slg[0] == '0') {
              inHole.stats[2].stats.slg =
                inHole.stats[2].stats.slg.substring(1);
            }
          }
        }
      }
    }
  }

  calculateAAASlg() {
    if (this.aaaData) {
      for (var i = 0; i < this.aaaData.dates[0].games.length; i++) {
        let batter = this.aaaData.dates[0].games[i].linescore.offense.batter;
        let onDeck = this.aaaData.dates[0].games[i].linescore.offense.onDeck;
        let inHole = this.aaaData.dates[0].games[i].linescore.offense.inHole;
        if (batter) {
          if (batter.stats[2].stats.atBats == 0) {
            batter.stats[2].stats.slg = '.000';
          }
          if (batter.stats[2].stats.atBats > 0) {
            batter.stats[2].stats.slg = (
              (batter.stats[2].stats.hits +
                batter.stats[2].stats.doubles +
                2 * batter.stats[2].stats.triples +
                3 * batter.stats[2].stats.homeRuns) /
              batter.stats[2].stats.atBats
            ).toFixed(3);
            if (batter.stats[2].stats.slg[0] == '0') {
              batter.stats[2].stats.slg =
                batter.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (onDeck) {
          if (+onDeck.stats[2].stats.atBats == 0) {
            onDeck.stats[2].stats.slg = '.000';
          }
          if (+onDeck.stats[2].stats.atBats > 0) {
            onDeck.stats[2].stats.slg = (
              (onDeck.stats[2].stats.hits +
                onDeck.stats[2].stats.doubles +
                2 * onDeck.stats[2].stats.triples +
                3 * onDeck.stats[2].stats.homeRuns) /
              onDeck.stats[2].stats.atBats
            ).toFixed(3);
            if (onDeck.stats[2].stats.slg[0] == '0') {
              onDeck.stats[2].stats.slg =
                onDeck.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (inHole) {
          if (+inHole.stats[2].stats.atBats == 0) {
            inHole.stats[2].stats.slg = '.000';
          }
          if (+inHole.stats[2].stats.atBats > 0) {
            inHole.stats[2].stats.slg = (
              (inHole.stats[2].stats.hits +
                inHole.stats[2].stats.doubles +
                2 * inHole.stats[2].stats.triples +
                3 * inHole.stats[2].stats.homeRuns) /
              inHole.stats[2].stats.atBats
            ).toFixed(3);
            if (inHole.stats[2].stats.slg[0] == '0') {
              inHole.stats[2].stats.slg =
                inHole.stats[2].stats.slg.substring(1);
            }
          }
        }
      }
    }
  }

  calculateAASlg() {
    if (this.aaData) {
      for (var i = 0; i < this.aaData.dates[0].games.length; i++) {
        let batter = this.aaData.dates[0].games[i].linescore.offense.batter;
        let onDeck = this.aaData.dates[0].games[i].linescore.offense.onDeck;
        let inHole = this.aaData.dates[0].games[i].linescore.offense.inHole;
        if (batter) {
          if (batter.stats[2].stats.atBats == 0) {
            batter.stats[2].stats.slg = '.000';
          }
          if (batter.stats[2].stats.atBats > 0) {
            batter.stats[2].stats.slg = (
              (batter.stats[2].stats.hits +
                batter.stats[2].stats.doubles +
                2 * batter.stats[2].stats.triples +
                3 * batter.stats[2].stats.homeRuns) /
              batter.stats[2].stats.atBats
            ).toFixed(3);
            if (batter.stats[2].stats.slg[0] == '0') {
              batter.stats[2].stats.slg =
                batter.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (onDeck) {
          if (+onDeck.stats[2].stats.atBats == 0) {
            onDeck.stats[2].stats.slg = '.000';
          }
          if (+onDeck.stats[2].stats.atBats > 0) {
            onDeck.stats[2].stats.slg = (
              (onDeck.stats[2].stats.hits +
                onDeck.stats[2].stats.doubles +
                2 * onDeck.stats[2].stats.triples +
                3 * onDeck.stats[2].stats.homeRuns) /
              onDeck.stats[2].stats.atBats
            ).toFixed(3);
            if (onDeck.stats[2].stats.slg[0] == '0') {
              onDeck.stats[2].stats.slg =
                onDeck.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (inHole) {
          if (+inHole.stats[2].stats.atBats == 0) {
            inHole.stats[2].stats.slg = '.000';
          }
          if (+inHole.stats[2].stats.atBats > 0) {
            inHole.stats[2].stats.slg = (
              (inHole.stats[2].stats.hits +
                inHole.stats[2].stats.doubles +
                2 * inHole.stats[2].stats.triples +
                3 * inHole.stats[2].stats.homeRuns) /
              inHole.stats[2].stats.atBats
            ).toFixed(3);
            if (inHole.stats[2].stats.slg[0] == '0') {
              inHole.stats[2].stats.slg =
                inHole.stats[2].stats.slg.substring(1);
            }
          }
        }
      }
    }
  }

  calculateHighASlg() {
    if (this.highAData) {
      for (var i = 0; i < this.highAData.dates[0].games.length; i++) {
        let batter = this.highAData.dates[0].games[i].linescore.offense.batter;
        let onDeck = this.highAData.dates[0].games[i].linescore.offense.onDeck;
        let inHole = this.highAData.dates[0].games[i].linescore.offense.inHole;
        if (batter) {
          if (batter.stats[2].stats.atBats == 0) {
            batter.stats[2].stats.slg = '.000';
          }
          if (batter.stats[2].stats.atBats > 0) {
            batter.stats[2].stats.slg = (
              (batter.stats[2].stats.hits +
                batter.stats[2].stats.doubles +
                2 * batter.stats[2].stats.triples +
                3 * batter.stats[2].stats.homeRuns) /
              batter.stats[2].stats.atBats
            ).toFixed(3);
            if (batter.stats[2].stats.slg[0] == '0') {
              batter.stats[2].stats.slg =
                batter.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (onDeck) {
          if (+onDeck.stats[2].stats.atBats == 0) {
            onDeck.stats[2].stats.slg = '.000';
          }
          if (+onDeck.stats[2].stats.atBats > 0) {
            onDeck.stats[2].stats.slg = (
              (onDeck.stats[2].stats.hits +
                onDeck.stats[2].stats.doubles +
                2 * onDeck.stats[2].stats.triples +
                3 * onDeck.stats[2].stats.homeRuns) /
              onDeck.stats[2].stats.atBats
            ).toFixed(3);
            if (onDeck.stats[2].stats.slg[0] == '0') {
              onDeck.stats[2].stats.slg =
                onDeck.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (inHole) {
          if (+inHole.stats[2].stats.atBats == 0) {
            inHole.stats[2].stats.slg = '.000';
          }
          if (+inHole.stats[2].stats.atBats > 0) {
            inHole.stats[2].stats.slg = (
              (inHole.stats[2].stats.hits +
                inHole.stats[2].stats.doubles +
                2 * inHole.stats[2].stats.triples +
                3 * inHole.stats[2].stats.homeRuns) /
              inHole.stats[2].stats.atBats
            ).toFixed(3);
            if (inHole.stats[2].stats.slg[0] == '0') {
              inHole.stats[2].stats.slg =
                inHole.stats[2].stats.slg.substring(1);
            }
          }
        }
      }
    }
  }

  calculateLowASlg() {
    if (this.lowAData) {
      for (var i = 0; i < this.lowAData.dates[0].games.length; i++) {
        let batter = this.lowAData.dates[0].games[i].linescore.offense.batter;
        let onDeck = this.lowAData.dates[0].games[i].linescore.offense.onDeck;
        let inHole = this.lowAData.dates[0].games[i].linescore.offense.inHole;
        if (batter) {
          if (batter.stats[2].stats.atBats == 0) {
            batter.stats[2].stats.slg = '.000';
          }
          if (batter.stats[2].stats.atBats > 0) {
            batter.stats[2].stats.slg = (
              (batter.stats[2].stats.hits +
                batter.stats[2].stats.doubles +
                2 * batter.stats[2].stats.triples +
                3 * batter.stats[2].stats.homeRuns) /
              batter.stats[2].stats.atBats
            ).toFixed(3);
            if (batter.stats[2].stats.slg[0] == '0') {
              batter.stats[2].stats.slg =
                batter.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (onDeck) {
          if (+onDeck.stats[2].stats.atBats == 0) {
            onDeck.stats[2].stats.slg = '.000';
          }
          if (+onDeck.stats[2].stats.atBats > 0) {
            onDeck.stats[2].stats.slg = (
              (onDeck.stats[2].stats.hits +
                onDeck.stats[2].stats.doubles +
                2 * onDeck.stats[2].stats.triples +
                3 * onDeck.stats[2].stats.homeRuns) /
              onDeck.stats[2].stats.atBats
            ).toFixed(3);
            if (onDeck.stats[2].stats.slg[0] == '0') {
              onDeck.stats[2].stats.slg =
                onDeck.stats[2].stats.slg.substring(1);
            }
          }
        }
        if (inHole) {
          if (+inHole.stats[2].stats.atBats == 0) {
            inHole.stats[2].stats.slg = '.000';
          }
          if (+inHole.stats[2].stats.atBats > 0) {
            inHole.stats[2].stats.slg = (
              (inHole.stats[2].stats.hits +
                inHole.stats[2].stats.doubles +
                2 * inHole.stats[2].stats.triples +
                3 * inHole.stats[2].stats.homeRuns) /
              inHole.stats[2].stats.atBats
            ).toFixed(3);
            if (inHole.stats[2].stats.slg[0] == '0') {
              inHole.stats[2].stats.slg =
                inHole.stats[2].stats.slg.substring(1);
            }
          }
        }
      }
    }
  }

  makeTheMLBHomeRunObjects() {
    if (this.mlbData) {
      for (var i = 0; i < this.mlbData.dates[0].games.length; i++) {
        if (
          this.mlbData.dates[0].games[i].homeRuns &&
          this.mlbData.dates[0].games[i].homeRuns.length > 0
        ) {
          for (
            var j = 0;
            j < this.mlbData.dates[0].games[i].homeRuns.length;
            j++
          ) {
            if (
              this.mlbData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'bottom'
            ) {
              this.mlbData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.mlbData.dates[0].games[i].teams.home.team.abbreviation;
            }
            if (
              this.mlbData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'top'
            ) {
              this.mlbData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.mlbData.dates[0].games[i].teams.away.team.abbreviation;
            }
            if (this.mlbData.dates[0].games[i].homeRuns[j].about.inning == 1) {
              this.mlbData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '1st Inning';
            }
            if (this.mlbData.dates[0].games[i].homeRuns[j].about.inning == 2) {
              this.mlbData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '2nd Inning';
            }
            if (this.mlbData.dates[0].games[i].homeRuns[j].about.inning == 3) {
              this.mlbData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '3rd Inning';
            }
            if (this.mlbData.dates[0].games[i].homeRuns[j].about.inning > 3) {
              this.mlbData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                this.mlbData.dates[0].games[i].homeRuns[j].about.inning +
                'th Inning';
            }
          }
        }
      }
    }
  }

  makeTheAAAHomeRunObjects() {
    if (this.aaaData) {
      for (var i = 0; i < this.aaaData.dates[0].games.length; i++) {
        if (
          this.aaaData.dates[0].games[i].homeRuns &&
          this.aaaData.dates[0].games[i].homeRuns.length > 0
        ) {
          for (
            var j = 0;
            j < this.aaaData.dates[0].games[i].homeRuns.length;
            j++
          ) {
            if (
              this.aaaData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'bottom'
            ) {
              this.aaaData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.aaaData.dates[0].games[i].teams.home.team.abbreviation;
            }
            if (
              this.aaaData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'top'
            ) {
              this.aaaData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.aaaData.dates[0].games[i].teams.away.team.abbreviation;
            }
            if (this.aaaData.dates[0].games[i].homeRuns[j].about.inning == 1) {
              this.aaaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '1st Inning';
            }
            if (this.aaaData.dates[0].games[i].homeRuns[j].about.inning == 2) {
              this.aaaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '2nd Inning';
            }
            if (this.aaaData.dates[0].games[i].homeRuns[j].about.inning == 3) {
              this.aaaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '3rd Inning';
            }
            if (this.aaaData.dates[0].games[i].homeRuns[j].about.inning > 3) {
              this.aaaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                this.aaaData.dates[0].games[i].homeRuns[j].about.inning +
                'th Inning';
            }
          }
        }
      }
    }
  }

  makeTheAAHomeRunObjects() {
    if (this.aaData) {
      for (var i = 0; i < this.aaData.dates[0].games.length; i++) {
        if (
          this.aaData.dates[0].games[i].homeRuns &&
          this.aaData.dates[0].games[i].homeRuns.length > 0
        ) {
          for (
            var j = 0;
            j < this.aaData.dates[0].games[i].homeRuns.length;
            j++
          ) {
            if (
              this.aaData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'bottom'
            ) {
              this.aaData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.aaData.dates[0].games[i].teams.home.team.abbreviation;
            }
            if (
              this.aaData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'top'
            ) {
              this.aaData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.aaData.dates[0].games[i].teams.away.team.abbreviation;
            }
            if (this.aaData.dates[0].games[i].homeRuns[j].about.inning == 1) {
              this.aaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '1st Inning';
            }
            if (this.aaData.dates[0].games[i].homeRuns[j].about.inning == 2) {
              this.aaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '2nd Inning';
            }
            if (this.aaData.dates[0].games[i].homeRuns[j].about.inning == 3) {
              this.aaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                '3rd Inning';
            }
            if (this.aaData.dates[0].games[i].homeRuns[j].about.inning > 3) {
              this.aaData.dates[0].games[i].homeRuns[j].matchup.ordinalInning =
                this.aaData.dates[0].games[i].homeRuns[j].about.inning +
                'th Inning';
            }
          }
        }
      }
    }
  }

  makeTheHighAHomeRunObjects() {
    if (this.highAData) {
      for (var i = 0; i < this.highAData.dates[0].games.length; i++) {
        if (
          this.highAData.dates[0].games[i].homeRuns &&
          this.highAData.dates[0].games[i].homeRuns.length > 0
        ) {
          for (
            var j = 0;
            j < this.highAData.dates[0].games[i].homeRuns.length;
            j++
          ) {
            if (
              this.highAData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'bottom'
            ) {
              this.highAData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.highAData.dates[0].games[i].teams.home.team.abbreviation;
            }
            if (
              this.highAData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'top'
            ) {
              this.highAData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.highAData.dates[0].games[i].teams.away.team.abbreviation;
            }
            if (
              this.highAData.dates[0].games[i].homeRuns[j].about.inning == 1
            ) {
              this.highAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning = '1st Inning';
            }
            if (
              this.highAData.dates[0].games[i].homeRuns[j].about.inning == 2
            ) {
              this.highAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning = '2nd Inning';
            }
            if (
              this.highAData.dates[0].games[i].homeRuns[j].about.inning == 3
            ) {
              this.highAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning = '3rd Inning';
            }
            if (this.highAData.dates[0].games[i].homeRuns[j].about.inning > 3) {
              this.highAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning =
                this.highAData.dates[0].games[i].homeRuns[j].about.inning +
                'th Inning';
            }
          }
        }
      }
    }
  }

  makeTheLowAHomeRunObjects() {
    if (this.lowAData) {
      for (var i = 0; i < this.lowAData.dates[0].games.length; i++) {
        if (
          this.lowAData.dates[0].games[i].homeRuns &&
          this.lowAData.dates[0].games[i].homeRuns.length > 0
        ) {
          for (
            var j = 0;
            j < this.lowAData.dates[0].games[i].homeRuns.length;
            j++
          ) {
            if (
              this.lowAData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'bottom'
            ) {
              this.lowAData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.lowAData.dates[0].games[i].teams.home.team.abbreviation;
            }
            if (
              this.lowAData.dates[0].games[i].homeRuns[j].about.halfInning ==
              'top'
            ) {
              this.lowAData.dates[0].games[i].homeRuns[j].matchup.batterTeam =
                this.lowAData.dates[0].games[i].teams.away.team.abbreviation;
            }
            if (this.lowAData.dates[0].games[i].homeRuns[j].about.inning == 1) {
              this.lowAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning = '1st Inning';
            }
            if (this.lowAData.dates[0].games[i].homeRuns[j].about.inning == 2) {
              this.lowAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning = '2nd Inning';
            }
            if (this.lowAData.dates[0].games[i].homeRuns[j].about.inning == 3) {
              this.lowAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning = '3rd Inning';
            }
            if (this.lowAData.dates[0].games[i].homeRuns[j].about.inning > 3) {
              this.lowAData.dates[0].games[i].homeRuns[
                j
              ].matchup.ordinalInning =
                this.lowAData.dates[0].games[i].homeRuns[j].about.inning +
                'th Inning';
            }
          }
        }
      }
    }
  }

  getYearToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    console.log(dateForTransform.getFullYear());
    return dateForTransform.getFullYear().toString();
  }

  getMonthToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    console.log(dateForTransform.getMonth() + 1);
    let monthToPass = dateForTransform.getMonth() + 1;
    let monthString;
    if (monthToPass < 10) {
      monthString = '0' + monthToPass;
    } else {
      monthString = monthToPass.toString();
    }
    console.log(monthString);
    return monthString;
  }

  getDayToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    console.log(dateForTransform.getDate());
    return dateForTransform.getDate().toString();
  }

  handleDateChange() {
    this.getTheScores(
      this.getYearToCall(),
      this.getMonthToCall(),
      this.getDayToCall()
    );
  }
}
